document.addEventListener('click', e => {
  const b = e.target.closest('#playBtn'), v = document.getElementById('myVideo');
  if (b && v?.paused) {
    v.play(); v.controls = true;
    b.classList.add('d-none');
    document.getElementById('videoDuration')?.classList.add('d-none');
  }
});

document.addEventListener('pause', e => {
  if (e.target.id === 'myVideo') {
    e.target.controls = false;
    document.getElementById('playBtn')?.classList.remove('d-none');
    document.getElementById('videoDuration')?.classList.remove('d-none');
  }
}, true);