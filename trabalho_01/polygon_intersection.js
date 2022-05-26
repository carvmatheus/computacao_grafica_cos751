pointInConvexPolycanvas = {
    const canvas = html`<canvas width=500 height=500 style="border:1px solid gray">`;
    const ctx = canvas.getContext("2d");
    //array de pontos a serem usados
    let pts = [
        [250, 400],
        [100, 100],
        [400, 100],
        [400, 400],
        [250, 250],
        [100, 400]
    ];
    //variável de seleção
    let sel = null;
    //Variável com os valores anteriores do mouse
    let prevMouse = null;
    //Atualiza o canvas com os dados do vetor pts 
    const update = () => {
      //limpa o canvas  
      ctx.clearRect(0, 0, 500, 500);
      //Verifica se o ponto está sobre o poligono
      const neg = pointInConvexPoly(pts[0], pts.slice(1));
      //Preenche os valores. Caso as bordas do Contexto seja igual a neg, viram vermelhas. Contrario pretas  
      ctx.fillStyle = ctx.strokeStyle = neg ? "red" : "black";
      //para cada ponto p no array de pontos
      for (let p of pts) {
        // Inicia o path
        ctx.beginPath();
        // Cria um arco de tamanho 5
        ctx.arc(...p, 5, 0, Math.PI * 2);
        // Preenche circulo com cor de contexto
        ctx.fill();
      }
      // Estilo de preenchimento do contexto. Caso o ponto esteja entre o poligono, preenche valor
      ctx.fillStyle = neg ? "#f005" : "#0005";
      // Começa o desenho do path
      ctx.beginPath();
      // Para cada ponto, dentro do array de pontos, cria uma linha entre [a,b] considerando [[a,b], [c,d]...]
      for (let p of pts.slice(1)) ctx.lineTo(...p);
      // Fecha o caminho
      ctx.closePath();
      // Nesse formato descrito no context faz uma linha
      ctx.stroke();
      // Preenche o contexto
      ctx.fill();
    };
    // Função de quando solta o botão do mouse
    canvas.onmouseup = () => {
      // Atualiza variável seleção
      sel = null;
      // Roda função de update (função anterior)
      update();
    };
    // Função que roda quando o mouse está clicado (objeto e é inicializado)
    canvas.onmousedown = (e) => {
      // Zera a variável de seleção
      sel = null;
      // A propriedade offsetX e offsetY fazem leitura da interface MouseEvent 
      // Fornecendo o deslocamento na coordenada X do ponteiro do mouse entre esse evento 
      // e o nó de destino.
      const mouse = [e.offsetX, e.offsetY];
      // Para cada ponto no nossa matrix de pontos
      for (let p of pts) {
        // pega a distancia entre as coordenadas do ponteiro do mouse com o ponto P 
        let d = dist(mouse, p);
        // Se a distancia for menor ou igual a 5 (tamanho do nosso circulo)
        if (d <= 5) {
          // seleção recebe o valor de P  
          sel = p;
          // Variável prevMouse recebe as coordenadas de mouse
          prevMouse = mouse;
          break;
        }
      }
      update();
    };
    // No movimento do mouse, inicializado e com o elemento mousemovement
    canvas.onmousemove = (e) => {
      // Se seleção for qualquer valor diferente de nulo  
      if (sel) {
        // Coleta o valor da posição do mouse  
        const mouse = [e.offsetX, e.offsetY];
        //
        vec2.add(sel, sel, vec2.sub([], mouse, prevMouse));
        prevMouse = mouse;
        update();
      }
    };
    update();
    return canvas;
  }