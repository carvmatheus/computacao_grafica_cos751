pointInPolyDemo = {
    const demo = html`<canvas width=500 height=500 style="border:1px solid gray">`;
    const ctx = demo.getContext("2d");
    let pts = [
      [250, 400],
      [100, 100],
      [400, 100],
      [400, 400],
      [250, 250],
      [100, 400]
    ];
    let sel = null;
    let prevMouse = null;
    const update = () => {
      ctx.clearRect(0, 0, 500, 500);
      const neg = pointInPoly(pts[0], pts.slice(1));
      ctx.fillStyle = ctx.strokeStyle = neg ? "red" : "black";
      for (let p of pts) {
        ctx.beginPath();
        ctx.arc(...p, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(...pts[0]);
      ctx.lineTo(1000, pts[0][1]);
      ctx.stroke();
      ctx.setLineDash([]);
  
      ctx.fillStyle = neg ? "#f005" : "#0005";
      ctx.beginPath();
      for (let p of pts.slice(1)) ctx.lineTo(...p);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    };
    demo.onmouseup = () => {
      sel = null;
      update();
    };
    demo.onmousedown = (e) => {
      sel = null;
      const mouse = [e.offsetX, e.offsetY];
      for (let p of pts) {
        let d = dist(mouse, p);
        if (d <= 5) {
          sel = p;
          prevMouse = mouse;
          break;
        }
      }
      update();
    };