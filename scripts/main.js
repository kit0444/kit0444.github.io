function getUA  () {
    document.getElementById("returnUA").innerHTML=navigator.userAgent;
}
function calcBMI () {
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    if (height === "" || weight === "") {
        document.getElementById("returnBMI").innerHTML="请输入正确的数值，放心，本网站不会记录您的任何信息，我也没这个能力。。。";
    }
    else {
        document.getElementById("returnBMI").innerHTML=weight/((height/100)*(height/100));
    }
}