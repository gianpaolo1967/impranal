$(function () {
    /*product-slider*/
    // var array = [];
    // array[0] = '../images/main_photo/1.jpg';
    // array[1] = '../images/main_photo/2.jpg';
    //
    // $(".main").css('background-image', 'url(' + array[0] + ')');
    //
    // $.arraySize = array.length;
    // $.curIndex = 0;
    // setInterval(function () {
    //     $.curIndex++;
    //     if ($.curIndex == $.arraySize) {
    //         $.curIndex = 0;
    //     }
    //     $(".main").css('background-image', 'url(' + array[$.curIndex] + ')');
    //
    // }, 5000);

    /*================= menu scroll =====================*/
    $('body').scrollspy({
        target: '#scrollspy-menu',
        offset: 120
    });
    $(".menu li>a, .logo, .form-link a, .buy-button a").click(function (event) {
        event.preventDefault();
        var dest = 0;
        $.getVal = $(this).attr('href');
        dest1 = $($.getVal).offset().top - 100;
        dest2 = $($.getVal).offset().top - 0;


        if ($(window).width() > 768) {
            $('html,body').animate({scrollTop: dest1}, 500, 'swing');
        }
    
        else {
            $('html,body').animate({scrollTop: dest2}, 500, 'swing');
        }
    });


    /* ================== popup =============== */
    $('#gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.popup-img').magnificPopup({
        type: 'image'
    });

    // $('.popup-modal').magnificPopup({
    //     type:'image'
    // });

    /* ================= gallery ===================== */
    $("#gallery").owlCarousel({
        itemsCustom: [[0, 1], [400, 1], [600, 3], [786, 5], [1000, 5], [1200, 5]],
        pagination: false,
        navigation: true,
        navigationText: [
            '<i class="fa fa-chevron-left"></i>',
            '<i class="fa fa-chevron-right"></i>'
        ]
    });

    /* ====================== Toggle fb comments ========================= */
    $('.fb-comments-tittle').on('click', function() {
        $(this).find('i').toggleClass('fa-angle-up fa-angle-down');
        $('.fb-comments-content').slideToggle();
    });
    
    /* ==================== Google map ======================= */
    var map = new GMaps({
        zoom: 16,
        el: '#map',
        lat: 49.82965057,
        lng: 23.96236181,
        styles: [{
            featureType: "all",
            elementType: "all",
            stylers: [
                { "hue": "#00a1ff" },
                { "saturation": -100 }
            ]
        }],
    });
    
    map.addMarker({
        lat: 49.83110476,
        lng:  23.96931672,
        title: 'м. Львів, вул. Городоцька, 174 оф.306',
        icon: "images/icons/location.png"
    });
    
    
    /* validate */
    $('input[data-validation]').on('blur', function () {
        ruleValid($(this));
    });

    $('.btn-consulting').on('click', function () {
		var
            hasError   = false,
            form       = $('#' + $(this).attr('form')),
            formAction = form.attr('action');

        form.find('input').each(function () {
            if (ruleValid($(this)) == false) {
                hasError = true;
            }
        });
		

		/*
        if (hasError == false) {
            $.ajax({
                url: formAction,
                method: 'post',
                data: form.serialize(),
                dataType: 'json',
            }).success(function (data) {
                if (data.status == true) {

                    message('success', form);
                    form.find('input').val('');

                } else {

                    message('error', form);

                }
            });
        }
        */
        if (hasError == false) 
			{
            $.ajax({
                url: formAction,
                method: 'post',
                data: form.serialize(),
                dataType: 'json',
            }).success(function (data) {

                if(data.status == 200) {
                    modal_success();
                } else {
                    modal_error();
                }

            }).error(function(e) {

                if(e.status == 200) {
                    modal_success();
                } else {
                    modal_error();
                }

            });
        }
				alert ('Form-contact ' + hasError);
    });

    $('.btn-entrepreneurs').on('click', function () {
        var
            hasError   = false,
            form       = $('#' + $(this).attr('form')),
            formAction = form.attr('action');

        form.find('input').each(function () {
            if (ruleValid($(this)) == false) {
                hasError = true;
            }
        });

        /*if (hasError == false) {
            $.ajax({
                url: formAction,
                method: 'post',
                data: form.serialize(),
                dataType: 'json',
            }).success(function (data) {
                if (data.status == true) {

                    message('success', form);
                    form.find('input').val('');

                } else {

                    message('error', form);

                }
            });
        }*/
        if (hasError == false) {
            $.ajax({
                url: formAction,
                method: 'post',
                data: form.serialize(),
                dataType: 'json',
            }).success(function (data) {

                if(data.status == 200) {
                    modal_success();
                } else {
                    modal_error();
                }

            }).error(function(e) {

                if(e.status == 200) {
                    modal_success();
                } else {
                    modal_error();
                }

            });
        }
    });

    $('.btn-order').on('click', function () {
        var
            hasError = false,
            form = $('#' + $(this).attr('form')),
            formAction = form.attr('action');

        form.find('input').each(function () {
            if (ruleValid($(this)) == false) {
                hasError = true;
            }
        });

        /*
        if (form.find('tbody tr').length) {
            hasError = true;
        }
        */

        var data = {
            name: form.find('[name="order-name"]').val(),
            phone: form.find('[name="order-phone"]').val(),
            total: form.find('.cart-total').text(),
            economy: form.find('.economy').text(),
            summary: form.find('.summary').text(),
            items: []
        };

        $.each(form.find('tbody tr'), function() {

                data.items.push({
                    type: $(this).data('type'),
                    color: $(this).data('color'),
                    capacity: $(this).data('capacity'),
                    qty:  $(this).data('qty'),
                });
        });

        /*
        if (hasError == false) {
            $.ajax({
                url: formAction,
                method: 'post',
                data: data,
                dataType: 'json',
            }).success(function (data) {
                if (data.status == true) {

                    message('success', form);

                    form.find('input').val('');

                } else {

                    message('error', form);
                }
            });
        }
        */

        if (hasError == false) {
            $.ajax({
                url: formAction,
                method: 'post',
                data: data,
                dataType: 'json',
            }).success(function (data) {

                if(data.status == 200) {
                    $('.modal-backdrop').remove();
                    $('.modal-open').removeClass();
                    $('#cart-modal').hide();
                    modal_success();
                } else {
                    $('.modal-backdrop').remove();
                    $('.modal-open').removeClass();
                    $('#cart-modal').hide();
                    modal_error();
                }

            }).error(function(e) {

                if(e.status == 200) {
                    $('.modal-backdrop').remove();
                    $('.modal-open').removeClass();
                    $('#cart-modal').hide();
                    modal_success();
                } else {
                    $('.modal-backdrop').remove();
                    $('.modal-open').removeClass();
                    $('#cart-modal').hide();
                    modal_error();
                }

            });
        }

    });

    function message(type, form) {
        if(type == 'error') {
            form.find('.message').addClass('alert-danger').text('Дані не було відправлено').slideDown();
        } else {
            form.find('.message').addClass('alert-success').text('Дані успішно відправлені').slideDown();
        }
    }


    function emailValid(object) {
        if (object.val() != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if (pattern.test(object.val())) {
                object.css({'outline': 'none'});
                object.siblings('.valid-email').text('');
                return true;
            } else {
                object.css({'outline': '#ff0000 solid 1px'});
                object.siblings('.valid-email').text('Не правильно введено email адресу');
                return false;
            }
        } else {
            object.css({'outline': '#ff0000 solid 1px'});
            object.siblings('.valid-email').text('Поле email не має бути пустим');
            return false;
        }
    }

    function phoneValid(object) {
        if (object.val() != '') {
            var pattern = /\+?[0-9]{7,12}/;
            if (pattern.test(object.val().replace(/[- \(\)]+/g, ''))) {
                object.css({'outline': 'none'});
                object.siblings('.valid-phone').text('');
                return true;
            } else {
                object.css({'outline': '#ff0000 solid 1px'});
                object.siblings('.valid-phone').text('Не правильно введено номер телефону');
                return false;
            }
        } else {
            object.css({'outline': '#ff0000 solid 1px'});
            object.siblings('.valid-phone').text('Поле телефону не має бути пустим');
            return false;
        }
    }

    function nameValid(object) {
        if (object.val() != '') {

            var pattern = /^[а-яА-ЯёЁіІїЇиИьЬєЄa-zA-Z0-9 _]+$/;
            if (pattern.test(object.val())) {
                object.css({'outline': 'none'});
                object.siblings('.valid-name').text('');
                return true;
            } else {
                object.css({'outline': '#ff0000 solid 1px'});
                object.siblings('.valid-name').text('Не правильно введено імя');
                return false;
            }
        } else {
            object.css({'outline': '#ff0000 solid 1px'});
            object.siblings('.valid-name').text('Поле імені не має бути пустим');
            return false;
        }
    }

    function ruleValid(object) {
        var
            rule   = object.data('validation'),
            result = true;

        switch (rule) {
            case 'name':
                result = nameValid(object);
                break;
            case 'email':
                result = emailValid(object);
                break;
            case 'phone':
                result = phoneValid(object);
                break;
        }

        return result;
    }

    /*popup*/
    $(document).on('click', '.popup-modal-dismiss', function (e) {
	    e.preventDefault();
	    $.magnificPopup.close();
  	});
});





function modal_success() {
    $.magnificPopup.open({
        items: {
            src: '#modal-success',
            type: 'inline',
            showCloseBtn: true
        }
    });
}

function modal_error() {
    $.magnificPopup.open({
        items: {
            src: '#modal-error',
            type: 'inline',
            showCloseBtn: true
        }
    });
}

