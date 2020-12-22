const resultado = document.getElementById("resultado");
const formChurrascometro = document.getElementById("formChurrascometro");

/**
 * Números mágicos
 São números que representam a abstração de alguma coisa e tem um valor constante que nunca mudam, então devem sempre estar em uma constante.
 */
const seisHoras = 6;
const carne650gramas = 650;
const carne400gramas = 400;
const carneKg = 1000;
const lataCerveja355ml = 355;
const bebida2000ml = 2000;
const bebida1200ml = 1200;
const bebida1500ml = 1500;

function calcular(event) {
  /**
   * preventDefault()
   * Impede que a ação de recarregar a página
   *  */
  event.preventDefault();

  /**
   * Função que verifica se já tem algum resultado, se tiver ele vai ser limpo e exibirá o novo.
   *  */
  removeResultadoAnterior();

  /**
   * Como os valores dos inputs só é usado para esse cálculo você pode criar eles dentro da função e já atribuindo em uma constante o valor do input. Ele ta em constante para garantir que em algum momento não altere esse valor por engano em alguma parte do código.
   */
  const qtdAdultos = document.getElementById("adultos").value;
  const qtdCriancas = document.getElementById("criancas").value;
  const duracaoChurrasco = document.getElementById("duracao").value;

  /**
   * Coloquei todos os cálculos em funcões específicas, que você vai consguir olhar em apenas um lugar toda a sua regra, da forma ques estava você fazia cálculo aqui nessa parte e também fazia cálculo no resultado.innerHTML. Agora cada lugar ficou com uma resposabildiade.
   */
  consumoCarnePorPessoa = calcularConsumoCarnePessoa(
    duracaoChurrasco,
    qtdAdultos,
    qtdCriancas
  );
  consumoCervejaPorPessoa = calcularConsumoCervejaPorPessoa(
    duracaoChurrasco,
    qtdAdultos
  );
  consumoBebidaPorPessoa = calcularQtdTotalBebidas(
    duracaoChurrasco,
    qtdAdultos,
    qtdCriancas
  );

  resultado.innerHTML += `<p>${consumoCarnePorPessoa}Kg de carne`;
  resultado.innerHTML += `<p>${consumoCervejaPorPessoa} Latas de cerveja`;
  resultado.innerHTML += `<p>${consumoBebidaPorPessoa}ml debBebidas`;

  /**
   * Depois que é cálculado e exibida as informações os valores do formulário são resetados
   */
  formChurrascometro.reset();
}

function calcularConsumoCarnePessoa(duracaoChurrasco, qtdAdultos, qtdCriancas) {
  return (
    (carnePorPessoa(duracaoChurrasco) * qtdAdultos +
      (carnePorPessoa(duracaoChurrasco) / 2) * qtdCriancas) /
    carneKg
  );
}

function calcularConsumoCervejaPorPessoa(duracaoChurrasco, qtdAdultos) {
  /**
   * Math.ceil
   * Arredonda pra mais o resultado da expressão.
   */
  return Math.ceil(
    (cervejaPorPessoa(duracaoChurrasco) * qtdAdultos) / lataCerveja355ml
  );
}

function calcularQtdTotalBebidas(duracaoChurrasco, qtdAdultos, qtdCriancas) {
  return Math.ceil(
    (bebidaPorPessoa(duracaoChurrasco) * qtdAdultos +
      (bebidaPorPessoa(duracaoChurrasco) / 2) * qtdCriancas) /
      bebida2000ml
  );
}

function carnePorPessoa(duracaoChurrasco) {
  /**
   * Essa comparação é similar ao if/else, o nome do operador é ternário. Primeiro você coloca o que vai querer comprar, em seguida o que é pra ser exibido se for verdadeiro e por último o que vai ser exibido se for falso. expressãoBooleana ? verdadeiro : falso;
   *
   * E o return vai retorna o resultado dessa expressão.
   *
   * Observação: O ternário só funciona em 1 linha.
   */
  return duracaoChurrasco >= seisHoras ? carne650gramas : carne400gramas;
}

function cervejaPorPessoa(duracaoChurrasco) {
  return duracaoChurrasco >= seisHoras ? bebida2000ml : bebida1200ml;
}

function bebidaPorPessoa(duracaoChurrasco) {
  return duracaoChurrasco >= seisHoras ? bebida1500ml : bebida1200ml;
}

function removeResultadoAnterior() {
  /**
   * hasChildNodes()
   * É uma função booleana que verifica se dentro do id resultado existe alguma outra tag, essas tags independete de qual for é chamada de Node.
   *
   * Se existir entra em um loop com o while on o parâmetro verificar se existe a primeira tag, se exister ele vai remover ela até não existir mais tag ou node
   *
   * While -> O comando while permite que um código seja executado ENQUANTO uma certa condição for verdadeira.
   * */
  if (resultado.hasChildNodes()) {
    while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
  }
}
