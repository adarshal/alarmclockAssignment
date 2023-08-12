const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const alarmTimeInput = document.getElementById('alarmTime');
const timeRemainingElement = document.getElementById('timeRemaining');
const show = document.getElementById('showAlrmtime');


let alarmInterval;
console.log("fg")
setAlarmBtn.addEventListener('click', () => {
  const alarmTimeString = alarmTimeInput.value;;
  show.innerText=alarmTimeString;
  
  const [hours, minutes] = alarmTimeString.split(':');

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    alert('Invalid time format! Please enter a valid time in HH:mm format.');
    return;
  }
  console.log("clcik")

  const now = new Date();
  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  clearInterval(alarmInterval);

  alarmInterval = setInterval(updateTime, 1000, alarmTime);
});

function updateTime(alarmTime) {
  const now = new Date();
  const timeDifference = alarmTime - now;

  if (timeDifference <= 0) {
    let src = './alarmAudio.mp3';
    let audio = new Audio(src);
    audio.play();
    clearInterval(alarmInterval);    
    alert('Time to wake up!');
    return;
  }

  
  const secondsRemaining = Math.floor(timeDifference / 1000);
 
  
  timeRemainingElement.textContent = `${secondsRemaining} seconds `;

}
