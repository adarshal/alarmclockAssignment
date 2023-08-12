
const addAlarmBtn = document.getElementById('addAlarmBtn');
const alarmTimeInput = document.getElementById('alarmTime');
const timeRemainingElement = document.getElementById('timeRemaining');
const show = document.getElementById('showAlrmtime');
let alarms=[]
const alarmsList = document.getElementById('alarmsList');


let alarmInterval;
console.log("fg")
addAlarmBtn.addEventListener('click', () => {
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

  const alarm = {
    time: alarmTime,
    id: Date.now() // Create a unique ID for each alarm
  };

  // clearInterval(alarmInterval);
  // alarmInterval = setInterval(updateTime, 1000, alarmTime);
  createAlarmElement(alarm);
  alarms.push(alarm);
  setAlarm(alarm);
});

function createAlarmElement(alarm) {
  const li = document.createElement('li');
  li.id=alarm.id;
  li.innerHTML = `${formatTime(alarm.time)} <button class="deleteAlarmBtn" data-id="${alarm.id}">Delete</button>`;
  alarmsList.appendChild(li);

  const deleteBtn = li.querySelector('.deleteAlarmBtn');
  deleteBtn.addEventListener('click', () => {
    deleteAlarm(alarm);
    li.remove();
  });
}


function setAlarm(alarm) {
  alarmInterval = setInterval(updateTime, 1000, alarm);
  alarm.interval = alarmInterval;

}

function deleteAlarm(alarm) {
  const index = alarms.findIndex(a => a.id === alarm.id);
  if (index !== -1) {
    clearInterval(alarms[index].interval);
    alarms.splice(index, 1);
  }
}

function formatTime(time) {
  return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

function updateTime(alarm) {
  const alarmTime=alarm.time
  const now = new Date();
  const timeDifference = alarmTime - now;

  if (timeDifference < 0) {
    let src = './alarmAudio.mp3';
    let audio = new Audio(src);
    audio.play();
    clearInterval(alarm.interval);
    timeRemainingElement.textContent = 'Time\'s up!';
    const index = alarms.findIndex(a => a.id === alarm.id);
    if (index !== -1) {
     clearInterval(alarms[index].interval);
     alarms.splice(index, 1);
     const li = alarmsList.querySelector(`li[id="${alarm.id}"]`);
     li.remove();
    }
    alert('Time to wake up!');
    return;
  } 
  // const secondsRemaining = Math.floor(timeDifference / 1000);
  // timeRemainingElement.textContent = `${secondsRemaining} seconds `;
}
