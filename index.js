const canvas = document.getElementById("canvas");
const faceColor = document.querySelector("#face-color");

const borderColor = document.querySelector("#border-color");
const numberlineColor = document.querySelector("#number-color");
const handsColor = document.querySelector("#hands-color");
const secondsColor = document.querySelector("#seconds-color");

function clock() {
  const now = new Date();
  //setup canvas

  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250);
  ctx.rotate(-Math.PI / 2);
  //set default style
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = faceColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  //draw clock face /border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.strokeStyle = borderColor.value;
  ctx.stroke();
  ctx.fill();

  ctx.restore();
  //hourmark
  ctx.save();
  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.strokeStyle = numberlineColor.value;
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();
  //minute mark
  ctx.save();
  for (i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.strokeStyle = numberlineColor.value;

      ctx.moveTo(110, 0);
      ctx.lineWidth = 1;
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }

  ctx.restore();

  const hr = now.getHours();
  const mins = now.getMinutes();
  const sec = now.getSeconds();

  //draw hour hand
  ctx.save();

  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * mins + (Math.PI / 126000) * sec
  );
  ctx.strokeStyle = handsColor.value;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(-21, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();
  //draw minute hand
  ctx.save();

  ctx.rotate((Math.PI / 30) * mins + (Math.PI / 18000) * sec);
  ctx.strokeStyle = handsColor.value;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(108, 0);
  ctx.stroke();
  ctx.restore();
  //draw seconds hand
  ctx.save();

  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondsColor.value;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.fillStyle = secondsColor.value;
  ctx.moveTo(-21, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
  ctx.restore();
  requestAnimationFrame(clock);
}
requestAnimationFrame(clock);
document.querySelector(".button").addEventListener("click", function () {
    const dataURL = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download="clock.png";
    link.href=dataURL;
    link.click()
});
