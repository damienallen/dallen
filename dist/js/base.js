function sendEmail() {

    $.ajax({
        url : "/contact/",
        type : "POST",
        data : {
            name : $('#id_name').val(),
            email : $('#id_email').val(),
            subject : $('#id_subject').val(),
            message : $('#message-text').val()
        },
        success : function(json) {
            console.log(json);
            console.log("success");
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });

}


$(document).ready(function () {

    // Get CSRF tokens for AJAX requests
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
            }
        }
    });

    // Fade cover background on scroll
    $(window).scroll(function () {

        var multiplier = 0.1;

        var coverOpacity = (100 - $(this).scrollTop()*multiplier)/100;
        if (coverOpacity < 0) {
            coverOpacity = 0;
        }

        var boxShadowInitialOpacity = 0.2;
        var boxShadowOpacity = boxShadowInitialOpacity * coverOpacity;
        var boxShadowValue = '0 3px 15px rgba(0,0,0,' + boxShadowOpacity + ')';
        $('.cover').css({opacity: coverOpacity})
        $('#work').css({boxShadow: boxShadowValue})
    });

    // Add padding to in-page nav
    var offset = 50;

    $('#navbar-links a, .down-arrow a').click(function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - offset
        }, 800);

    });

    // Add tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Initialize contact form
    $('#contact-form').on('submit', function(event){
        event.preventDefault();
        sendEmail();
    });

    // Add WYSIWYG editor to textarea
    $('#message-text').trumbowyg({
        // autogrow: true,
        // autogrowOnEnter: true,
        btns: [
            ['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em'],
            ['unorderedList', 'orderedList'],
            ['fullscreen']
        ]
    });

});