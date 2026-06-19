function load_student_from_xml(dataset,body_student)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataset, true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var xmlDoc = xhr.responseXML;
            render_xml2html(xmlDoc, body_student)
        }
    }
}

function render_xml2html(xmlDoc,body_student)
{
//load an array of customer XML tag: 
    var student_tags=xmlDoc.getElementsByTagName("student")
    for(i=0;i<student_tags.length;i++)
    {
        //get tag at i position
        //XML DOM 
        student_tag=student_tags[i]
        id_tag=student_tag.getElementsByTagName("id")[0]
        name_tag=student_tag.getElementsByTagName("name")[0]
        birthday_tag=student_tag.getElementsByTagName("birthday")[0]
        gender_tag=student_tag.getElementsByTagName("gender")[0]
        student_id=id_tag.childNodes[0].nodeValue
        student_name=name_tag.childNodes[0].nodeValue
        student_birthday=birthday_tag.childNodes[0].nodeValue
        student_gender=gender_tag.childNodes[0].nodeValue
        //HTML DOM
        tr=document.createElement("tr")
        td_id=document.createElement("td")
        td_name=document.createElement("td")
        td_birthday=document.createElement("td")
        td_gender=document.createElement("td")
        td_id.innerHTML=student_id
        td_name.innerHTML=student_name
        td_birthday.innerHTML=student_birthday
        td_gender.innerHTML=student_gender
        tr.appendChild(td_id)
        tr.appendChild(td_name)
        tr.appendChild(td_birthday)
        tr.appendChild(td_gender)
        
        tr.style.cursor = "pointer";
        tr.addEventListener("click", function() {
        window.open("detailpage.html?id=" + student_id, "_blank");
        });
        body_student.appendChild(tr)
    }
}

function load_student_detail(dataset, student_id)
{
    var xhr = new XMLHttpRequest()
    xhr.open("GET", dataset, true)
    xhr.send()
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var xmlDoc = xhr.responseXML
            var student_tags = xmlDoc.getElementsByTagName("student")
            
            for (i = 0; i < student_tags.length; i++)
            {
                student_tag = student_tags[i]
                id_tag = student_tag.getElementsByTagName("id")[0]
                current_id = id_tag.childNodes[0].nodeValue
                
                if (current_id.trim() == student_id)
                {
                    // Found the student, render detail
                    name_tag = student_tag.getElementsByTagName("name")[0]
                    birthday_tag = student_tag.getElementsByTagName("birthday")[0]
                    gender_tag = student_tag.getElementsByTagName("gender")[0]
                    
                    student_name = name_tag.childNodes[0].nodeValue
                    student_birthday = birthday_tag.childNodes[0].nodeValue
                    student_gender = gender_tag.childNodes[0].nodeValue
                    
                    render_student_detail(current_id, student_name, student_birthday, student_gender)
                    break
                }
            }
        }
    }
}

function render_student_detail(id, name, birthday, gender)
{
    document.getElementById("student-id").innerHTML = id.trim()
    document.getElementById("student-name").innerHTML = name.trim()
    document.getElementById("student-birthday").innerHTML = birthday.trim()
    document.getElementById("student-gender").innerHTML = gender.trim()
}

function display_student_detail_from_url(dataset_path)
{
    var urlParams = new URLSearchParams(window.location.search)
    var studentId = urlParams.get('id')
    
    if (studentId) {
        load_student_detail(dataset_path, studentId)
    }
}

function goBack()
{
    window.location.href = "listofstudent.html"
}