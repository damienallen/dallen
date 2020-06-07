// Import dependencies
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import 'trumbowyg'

// Import stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import 'trumbowyg/dist/ui/trumbowyg.css'
import 'normalize.css'

import './styles/base.scss'
import './styles/layout.scss'


const sendEmail = () => {

    const formData = {
        name: $('#id_name').val(),
        email: $('#id_email').val(),
        subject: $('#id_subject').val(),
        message: $('#message-text').val(),
        recaptcha: $('#g-recaptcha-response').val()
    }

    console.log(formData)

    $.ajax({
        url: "/api/submit",
        type: "POST",
        data: formData,
        success: (data) => {
            $('#submit-button').text('Sent!')
            $('#submit-button').prop('disabled', true)
            $('#form-errors').text('')
        },
        error: (data) => {
            $('#form-errors').text(data.responseJSON.status.message)
        }
    })

}

const adjustOpacity = () => {
    var windowHeight = window.innerHeight
    var paddingOffset = 10

    var coverOpacity = (windowHeight - paddingOffset - $(window).scrollTop()) / windowHeight
    if (coverOpacity < 0) {
        coverOpacity = 0
    }

    var boxShadowInitialOpacity = 0.2
    var boxShadowOpacity = boxShadowInitialOpacity * coverOpacity
    var boxShadowValue = '0 3px 15px rgba(0,0,0,' + boxShadowOpacity + ')'
    $('.cover').css({ opacity: coverOpacity })
    $('#work').css({ boxShadow: boxShadowValue })
}

$(document).ready(() => {

    // Hide modal initially
    $('#contact-modal').modal({ show: false })

    // Set initial background opacity and fade cover background on scroll
    adjustOpacity()
    $(window).scroll(() => {
        adjustOpacity()
    })

    // Add padding to in-page nav
    var offset = 50

    $('#navbar-links #sections a, .down-arrow a').click((event) => {
        event.preventDefault()

        $('html, body').animate({
            scrollTop: $($(event.currentTarget).attr('href')).offset().top - offset
        }, 800)

    })

    // Add tooltips
    $('[data-toggle="tooltip"]').tooltip()

    // Initialize contact form
    $('#contact-form').on('submit', (event) => {
        event.preventDefault()
        sendEmail()
    })

    // Add WYSIWYG editor to textarea
    $('#message-text').trumbowyg({
        svgPath: 'icons/trumbowyg_icons.svg',
        btns: [
            ['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em'],
            ['unorderedList', 'orderedList'],
            ['fullscreen']
        ]
    })

    const now = new Date()
    console.log(`Loaded at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`)

})
