export const futuristicButton = `
// original video - https://www.youtube.com/watch?v=YKv3F9gcGuc

// html
  <div class='container'>
    <button class='btn'>
      <i></i><i></i>
      <span>Button</span>
    </button>
  </div>

//css

.container {
  --futuristic-button: 45deg;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  position: relative;
  width: 150px;
  height: 55px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: transparent;
}

.btn i {
  position: absolute;
  inset: -2px;
  border-radius: 5px;
  background: linear-gradient(var(--futuristic-button), #00ccff, #0e1538, #0e1538, #d400d4);
}

.btn i:nth-child(2) {
  filter: blur(10px);
}

.btn span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 2px;
  border-radius: 3px;
  border: 1px solid #040a29;
  background: rgba(14, 21, 56, 0.65);
  overflow: hidden;
}

.btn span::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.075);
  transform: skew(25deg);
}

//js
const btn = document.querySelector('btn')
btn.addEventListener('mousemove', (e) => {
  const rect = e.target.getBoundingClientRect()
  const x = e.clientX * 3 - rect.left;
  btn.style.setProperty('--futuristic-button', x + 'deg');
})
`;
