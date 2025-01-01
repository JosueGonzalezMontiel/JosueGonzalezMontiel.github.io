window.onload = function() {
    setTimeout(() => {
        $('#onload').fadeOut();
        $('body').removeClass('hidden');
    }, 9000); // 5000 milisegundos = 5 segundos
};