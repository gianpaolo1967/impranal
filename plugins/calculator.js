$(function() {

    var
        product,
        result = $('.result'),
        size_l,
        size_m,
        size_s;


    /* open calculator */
    $('#order-form-list').on('click', '.btn-calculator', function() {

        $('#calculator-modal').modal();

        var productItem = $(this).parents('.order-form-item');

        productItem.addClass('open-calculator');

        var
            type = productItem.data('type'),
            index = productItem.data('index');

        product = getOrderData(type, index);

    });

    $('#calculator-modal').on('hide.bs.modal', function (e) {
        $('input#area').val('');
        result.addClass('hidden');
        $('#order-form-list .order-form-item').removeClass('open-calculator');
    });

    function validateValue(value) {
        return value.replace(/,/g, '.').replace(/^([^\.]*\.)|\./g, '$1').replace(/[^0-9\.]+/g, '');
    }

    $('input#area').on('input paste', function() {
        var that = $(this);

        that.val(validateValue(that.val()));
    });

    $('.btn-calculate').on('click', function(e) {
        e.preventDefault();

        var inputValue = validateValue($('input#area').val());

        if(!inputValue) {
            return;
        }

        var summaryCapacity = 0;
        $.each(product.item.capacities, function(key, value) {
            summaryCapacity += parseFloat(value.capacity);
        });

        summaryCapacity = Math.round(summaryCapacity*100)/100;

        if($('input#layers3').is(':checked')) {
            inputValue = inputValue*1.7;
        }

        if(summaryCapacity == 8.25) {
            calculator_type1(inputValue);
        } else {
            calculator_type2(inputValue);
        }

        var getResultHTML = ejs.compile($('[data-template="calculation-result"]').html()),
            html = getResultHTML({
                capacities: product.item.capacities,
                qty: [size_s, size_m, size_l]
            });

        result.html(html);


        if(result.hasClass('hidden')) {
            result.removeClass('hidden').slideDown();
        }

    });

    $(document).on('click', '.btn-save-result', function(e) {
        e.preventDefault();
        
        var openCalculator = $('.open-calculator');
        $('.result').find('[data-capacity]').each(function() {
            var that = $(this);
            openCalculator.find('[data-capacity="'+ that.data('capacity') +'"]').val(that.text());
        });

        $("#calculator-modal button.close").trigger("click");

        $('#order-form-list').trigger("order_list::update");
    });

    function calculator_type1(area) {

        size_l = 0;
        size_m = 0;
        size_s = 0;

        if(area/7 >= 5) {

            size_l = Math.floor((area/7)/5);

            if((area/7 - size_l*5) >= 2.5) {

                size_m = Math.floor((area/7 - size_l*5)/2.5);

                if((area/7 - size_l*5-2.5*size_m)<= 1.5) {

                    size_s = Math.ceil(((area/7- size_l*5)-2.5*size_m)/ 0.75);

                } else {

                    size_m += 1;
                    size_s = 0;

                }

            } else {

                if((area/7 - size_l*5) <= 1.5) {
                    size_s = Math.ceil((area/7- size_l*5)/0.75);
                    size_m = 0;

                } else {
                    size_m = 1 ;
                    size_s = 0;
                }
            }

        } else {

            if(area/7 >= 2.5) {
                size_m = Math.floor((area/7)/2.5);

                if((area/7- 2.5*size_m)<= 1.5) {

                    size_s = Math.ceil((area/7-2.5* size_m)/ 0.75);
                    size_l = 0;

                } else {

                    size_m = 0;
                    size_s = 0;
                    size_l = 1;

                }

            } else {

                if(area/7 <= 1.5) {
                    size_s = Math.ceil((area/7)/0.75);
                    size_m = 0;
                    size_l = 0;

                } else {

                    size_m = 1 ;
                    size_s = 0;
                    size_l = 0;

                }
            }
        }

    }

    function calculator_type2(area) {

        size_l = 0;
        size_m = 0;
        size_s = 0;

        if(area/7 >= 5) {

            size_l = Math.floor((area/7)/5);

            if((area/7 - size_l*5) >= 2.2) {

                size_m = Math.floor((area/7 - size_l*5)/2.2);

                if((area/7 - size_l*5-2.2*size_m)<= 1.2) {

                    size_s = Math.ceil(((area/7- size_l*5)-2.2*size_m)/ 0.6);

                } else {

                    size_m += 1;
                    size_s = 0;

                }

            } else {

                if((area/7 - size_l*5) <= 1.2) {
                    size_s = Math.ceil((area/7- size_l*5)/0.6);
                    size_m = 0;

                } else {
                    size_m = 1 ;
                    size_s = 0;
                }
            }

        } else {

            if(area/7 >= 2.2) {
                size_m = Math.floor((area/7)/2.2);

                if((area/7- 2.2*size_m)<= 1.2) {

                    size_s = Math.ceil((area/7-2.2* size_m)/ 0.6);
                    size_l = 0;

                } else {

                    size_m += 1;
                    size_s = 0;
                    size_l = 0;

                }

            } else {

                if(area/7 <= 1.2) {
                    size_s = Math.ceil((area/7)/0.6);
                    size_m = 0;
                    size_l = 0;

                } else {

                    size_m = 1 ;
                    size_s = 0;
                    size_l = 0;

                }
            }
        }
    }
});