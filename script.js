$(document).ready(function() {
  // Configuração do Form Builder
  const formBuilder = $('#form-builder').formBuilder();

  // Ação do botão de envio
  $('#submit-form').on('click', function() {
    const formData = formBuilder.actions.getData('json');
    const formDataObject = JSON.parse(formData);

    const cep = formDataObject[0].value; // Considerando que o primeiro campo seja o CEP

    if (cep) {
      // Chama a API ViaCEP para buscar as informações do endereço
      $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          // Preenche os dados no formulário de endereço
          if (data.erro) {
            alert("CEP não encontrado.");
          } else {
            $('#cep').text(data.cep);
            $('#logradouro').text(data.logradouro);
            $('#bairro').text(data.bairro);
            $('#cidade').text(data.localidade);
            $('#estado').text(data.uf);
          }
        },
        error: function() {
          alert("Erro ao buscar os dados do CEP.");
        }
      });
    } else {
      alert("Por favor, insira um CEP.");
    }
  });
});
