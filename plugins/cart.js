var productsData = {};

$(function() {
    var
        orderFormId = '#order-form-container',
        orderForm = $(orderFormId),
        orderFormList = $('#order-form-list'),
        getProductTypeHTML = ejs.compile($('[data-source="product-type"]').html()),
        getProductHTML = ejs.compile($('[data-template="order-form-item"]').html()),
        getCartHTML = ejs.compile($('[data-template="cart-list-item"]').html());



    $.getJSON('data/products.json', function(data){
        if(data.products) {
            productsData = data.products;
        }

        initForm();
    });

    function initForm() {

        orderForm.find('[data-product-type]').each(function() {
            var that = $(this);
            var loadType = that.data('load-type');

            if (productsData[loadType] == undefined) {
                console.error('Type ' + loadType + ' not isset');
                return;
            }

            var html = getProductTypeHTML({
                data: productsData[loadType],
                type: loadType,
            });

            that.html(html);
        });
    }

    /* add color to order */
    orderForm.on('click', '.palette a', function(e) {
//        e.preventDefault();
        var
            that = $(this),
            type = that.data('type'),
            index = that.data('index'),
            order = getOrderData(type, index);

        if(!order) {
            return false;
        }

        if($('#order-form-list .order-form-item[data-slug="'+ type+'_'+ index +'"]').length) {
            return false;
        }

        var html = getProductHTML({
            order: order,
            type: type,
            index: index
        });

        orderFormList.append(html);
        $('.order-form-item:last .popup-img').magnificPopup({
            type: 'image'
        });

    });

    /* delete order item */
    orderFormList.on('click', '.delete-item', function(e) {
        e.preventDefault();
        $(this).parents('.order-form-item').remove();
        orderFormList.trigger('order_list::update');
    });

    /* change qty */
    orderFormList.on('input paste', '.order-input', function() {
        var that = $(this),
            inputValue = that.val().replace(/[^0-9]+/g, '');

        that.val(inputValue);

        orderFormList.trigger('order_list::update');
    });

    /* animation for cart */
    orderFormList.on('keyup', '.order-input', function() {
       $('.cart-btn').addClass('pulse');
        setTimeout(function() {
            $('.cart-btn').removeClass('pulse');
        }, 1200); // animation time
    });
    orderFormList.on('blur', '.order-input', function() {
        $('.cart-btn').removeClass('pulse');
    });

    orderFormList.on('order_list::update', function() {
        var inputs = $(this).find('.order-input'),
            quantity = 0;

        $.each(inputs, function() {
            if ($(this).val() != 0 && $(this).val() != '') {
                quantity += parseInt($(this).val());
            }
        });
        $('.cart-quantity').text(quantity);
    });

    /* open cart */
    $('#cart').on('click',function(){

        var cartItems = [];

        var items = $('#order-form-list .order-input');

        $.each(items, function() {
            var that = $(this),
                value = that.val(),
                type = that.parents('.order-form-item').data('type').toLowerCase(),
                index = that.parents('.order-form-item').data('index'),
                order = getOrderData(type, index);
            
            if(value != 0 && value != '') {
                cartItems.push({
                    qty: value,
                    capacity: that.data('capacity'),
                    price: that.data('price'),
                    product: order
                });
            }
        });

        var html = getCartHTML({
            items: cartItems
        });

        $('#order-form tbody').empty().html(html);

        updateCartTotal();
        
        $('#cart-modal').modal();
    });

    function updateCartTotal() {
        var cartItemQuantity,
            cartItemPrice,
            cartTotal = 0,
            economy = 0,
            summary,
            cartModal = $('#cart-modal');

        $.each($('#order-form tbody tr'), function() {
            cartItemQuantity = parseInt($(this).find('td:last').html());
            cartItemPrice = parseFloat($(this).data('price'));
            cartTotal += cartItemQuantity * cartItemPrice;
        });

        cartModal.find('.cart-total').html(cartTotal.toFixed(2));

        if(cartTotal < 1500) {
            economy = 0;
        } else if(cartTotal >= 1500 && cartTotal < 5000) {
            economy = cartTotal*0.05;
        } else if(cartTotal >= 5000 && cartTotal < 10000) {
            economy = cartTotal*0.1;
        } else {
            economy = cartTotal*0.15;
        }

        cartModal.find('.economy').html(economy.toFixed(2));

        summary = cartTotal - economy;
        cartModal.find('.summary').html(summary.toFixed(2));

    }
});

function getOrderData(type, index) {
    if(typeof productsData[type].items[index] === 'undefined') {
        return {};
    }
    return {
        title: productsData[type].title,
        title_type: productsData[type].title_type,
        item: productsData[type].items[index]
    };
}
