isoscelesDemo = {
    const demo = html`<canvas width=500 height=500 style="border:1px solid gray">`;
    const ctx = demo.getContext("2d");
    const iso = [
      [200, 300],
      [300, 200]
    ];
  
    const update = () => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillStyle = ctx.strokeStyle = "black";
      for (let p of iso) {
        ctx.beginPath();
        ctx.arc(...p, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      for (let p of isosceles(...iso)) {
        ctx.lineTo(...p);
      }
      ctx.closePath();
      ctx.stroke();
    };
    update();
  
    let prevMouse = null;

    // inicia o arrastar da base
    const dragBase = (e) => {
      // atribui mouse os valores atuais de X e Y
      let mouse = [e.offsetX, e.offsetY];
      // quebra a matriz por linhas
      let [base, vtx] = iso;
      // subtração vec2.sub(valor de saida, a, b)
      // subtrai os valores das colunas [[v,w],[x,y]] => [[v-x],[w-y]]
      let v = vec2.sub([], vtx, base);
      // subtrai a posição de mouse com a anterior (no caso, nulo)
      let delta = vec2.sub([], mouse, prevMouse);
      // Salva a posição atual no backup de prevMouse
      prevMouse = mouse;
      // adiciona os valores das colunas de base e delta atualizando base
      // em resumo, adiciona o deslocamento ao valor da base
      vec2.add(base, base, delta);
      // mesma coisa, porém atualizando vtx
      // em resumo, adiciona o novo valor da base a distancia entre vtx e base
      vec2.add(vtx, base, v);
    };
    const dragVtx = (e) => {
      // atualiza posição do mouse  
      let mouse = [e.offsetX, e.offsetY];
      // quebra a matriz em duas variáveis
      let [base, vtx] = iso;
      // subtrai a distancia do mouse atual com o anterior
      let delta = vec2.sub([], mouse, prevMouse);
      // salva a posição atual no backup
      prevMouse = mouse;
      // adiciona ao valor de vtx a distancia entre ele e delta (aumentando vtx)
      vec2.add(vtx, vtx, delta);
    };
  
    demo.onmousedown = (e) => {
      // Extrai a posição atual de x e y no mouse
      const mouse = [e.offsetX, e.offsetY];
      // atribui os valores de X e Y para prevMouse
      prevMouse = mouse;
      // atribui null a onmousemove
      demo.onmousemove = null;
      // Para cada i em 0 e 1
      for (let i of [0, 1]) {
        // pega a posição atual de matriz iso
        let p = iso[i];
        // calcula a distancia entre a posição do mouse e o ponto p
        let d = vec2.distance(mouse, p);
        // Se a distancia é menor que 5
        if (d <= 5) {
          // compara o resultado de mousemove com i == 0 
          // Ou seja, ele só se move se i for igual a zero
          demo.onmousemove =
            i == 0
              ? (e) => {
                  // Move a base
                  dragBase(e);
                  // atualiza o canvas
                  update();
                }
              : (e) => {
                  // move o vertice
                  dragVtx(e);
                  // atualiza o canvas
                  update();
                };
        }
      }
    };
  
    demo.onmouseup = () => {
      demo.onmousemove = null;
    };
    return demo;
  }