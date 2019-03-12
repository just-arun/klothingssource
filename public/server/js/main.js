$(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
    $('select').formSelect();
    $('.datepicker').datepicker();
});
// delete for mens
$('.delete-item').click((e)=>{
    let id = $(e.target).attr('data-id');
    console.log(id);
    if (confirm('do you realy want to delete this shit')) {
        $.ajax({
            type: "DELETE",
            url: "/admin/users/api/mens/"+id,
            dataType: "dataType",
            success: (res) => {
                alert('Prodect deleted');
                window.location.reload();
            },
            error: (err)=>{
                console.log(err);
            }
        });
        window.location.reload();
    }
});

// delete for womens
$('.delete-item-womens').click((e)=>{
    let id = $(e.target).attr('data-id');
    console.log(id);
    if (confirm('do you realy want to delete this shit')) {
        $.ajax({
            type: "DELETE",
            url: "/admin/users/api/womens/"+id,
            dataType: "dataType",
            success: function (response) {
                alert('Prodect deleted');
                window.location.reload();
            },
            error: (err)=>{
                console.log(err);
            }
        });
        window.location.reload();
    }
});

// delete for accessories
$('.delete-item-accessories').click((e)=>{
    let id = $(e.target).attr('data-id');
    console.log(id);
    if (confirm('do you realy want to delete this shit')) {
        $.ajax({
            type: "DELETE",
            url: "/admin/users/api/accessories/"+id,
            dataType: "dataType",
            success: function (response) {
                alert('Prodect deleted');
                window.location.reload();
            },
            error: (err)=>{
                console.log(err);
            }
        });
        window.location.reload();
    }
});


// delete for coupens
$('.delete-item-coupens').click((e)=>{
    let id = $(e.target).attr('data-id');
    console.log(id);
    if (confirm('do you realy want to delete this shit')) {
        $.ajax({
            type: "DELETE",
            url: "/admin/users/api/coupens/"+id,
            dataType: "dataType",
            success: function (response) {
                alert('Prodect deleted');
                window.location.reload();
            },
            error: (err)=>{
                console.log(err);
            }
        });
        window.location.reload();
    }
});

// delete for deals
$('.delete-item-deals').click((e)=>{
    let id = $(e.target).attr('data-id');
    console.log(id);
    if (confirm('do you realy want to delete this shit')) {
        $.ajax({
            type: "DELETE",
            url: "/admin/users/api/deals/"+id,
            dataType: "dataType",
            success: function (response) {
                alert('Prodect deleted');
                window.location.reload();
            },
            error: (err)=>{
                console.log(err);
            }
        });
        window.location.reload();
    }
});



// show hide toTop button
$(window).scroll(function () { 
    if( pageYOffset > innerHeight ) {
        $(".toTop").fadeIn();
    }else{
        $(".toTop").fadeOut();
    }
});