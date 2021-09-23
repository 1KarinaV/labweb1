$(function () {
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function validateX() {
                if ($('.x-radio').is(':checked')) {
                    $('.xbox-label').removeClass('box-error');
                    return true;
                } else {
                    $('.xbox-label').addClass('box-error');
                    return false;
                }
            }

            function validateY() {
                const Y_MIN = -5;
                const Y_MAX = 5;

                let yField = $('#y-textinput');
                let numY = yField.val().replace(',', '.');

                if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX) {
                    yField.removeClass('text-error');
                    return true;
                } else {
                    yField.addClass('text-error');
                    return false;
                }
            }

            function validateR() {
                if ($('.r-checkbox').is(':checked')) {
                    $('.rbox-label').removeClass('box-error');
                    return true;
                } else {
                    $('.rbox-label').addClass('box-error');
                    return false;
                }
            }

            function validateForm() {
                return validateX() & validateY() & validateR();
            }

            $('#input-form').on('submit', function (event) {
                event.preventDefault();
                if (!validateForm()) return;
                $.ajax({
                    url: 'main.php',
                    method: 'GET',
                    data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(),
                    dataType: "json",
                    beforeSend: function () {
                        $('.button').attr('disabled', 'disabled');
                    },
                    success: function (data) {
                        $('.button').attr('disabled', false);
                        if (data.validate) {
                            newRow = '<tr>';
                            newRow += '<td>' + data.xval + '</td>';
                            newRow += '<td>' + data.yval + '</td>';
                            newRow += '<td>' + data.rval + '</td>';
                            newRow += '<td>' + data.curtime + '</td>';
                            newRow += '<td>' + data.exectime + '</td>';
                            newRow += '<td>' + data.hitres + '</td>';
                            $('#result-table').append(newRow);
                        }

                    }
                });
            });
        });
