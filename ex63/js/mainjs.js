function registerMember() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var birthday = day + "/" + month + "/" + year;
    
    var hobbies = [];
    var checkboxes = document.querySelectorAll('input[name="hobbies"]:checked');
    checkboxes.forEach(function(cb) {
        hobbies.push(cb.value);
    });
    
    var color = document.querySelector('input[name="color"]:checked').value;
    
    if (name === "" || email === "") {
        alert("Please fill in all required fields");
        return;
    }
    
    var member = {
        name: name,
        email: email,
        gender: gender,
        birthday: birthday,
        hobbies: hobbies.join(", "),
        color: color
    };
    
    members.push(member);
    displayMembers();
    document.getElementById("memberForm").reset();
}

function displayMembers() {
    var tbody = document.getElementById("memberBody");
    tbody.innerHTML = "";
    
    members.forEach(function(member) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + member.name + "</td>" +
                       "<td>" + member.email + "</td>" +
                       "<td>" + member.gender + "</td>" +
                       "<td>" + member.birthday + "</td>" +
                       "<td>" + member.hobbies + "</td>" +
                       "<td>" + member.color + "</td>";
        tbody.appendChild(tr);
    });
}


window.onload = function() {
    displayMembers();
    document.getElementById("day").value = "01";
    document.getElementById("month").value = "01";
    document.getElementById("year").value = "1970";
};
