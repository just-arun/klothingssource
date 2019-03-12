let app = angular.module('app',['ngRoute','ngAnimate']);
app.config(($routeProvider)=>{
    $routeProvider
    .when('/',{
        templateUrl:'./control/dashboard.html'
    })
    .when('/Deals',{
        templateUrl:'/control/deals.html',
        controller:'dealsPage'
    })
    .when('/Detail/:id',{
        templateUrl:'/control/detail.html',
        controller: 'details-ctrl'
    })
    .when('/Coupens',{
        templateUrl: '/control/coupens.html',
        controller: 'coupensPage'
    })
    .when('/Mens-All',{
        templateUrl:'/control/mens.html',
        controller:'onlymens'
    })
    .when('/Mens/:catagory',{
        templateUrl:'/control/mens.html',
        controller:'mensCatogery'
    })
    .when('/Womens-All',{
        templateUrl:'/control/womens.html',
        controller:'onlywomens'
    })
    .when('/Womens/:catagory',{
        templateUrl:'/control/womens.html',
        controller:'womensCatogery'
    })
    .when('/Accessories-All',{
        templateUrl:'/control/accessories.html',
        controller:'onlyAccessories'
    })
    .when('/catogery/:cato',{
        templateUrl:'/control/catagoryPage.html',
        controller:'whichCatogery'
    })
    .otherwise({redirectTo: '/'});

});


app.run(function($rootScope,$http){
    $rootScope.mens;
    $rootScope.womens;
    $rootScope.access;
    $rootScope.priceF=10000;
    $rootScope.amount;
    let empty = '';
    $rootScope.searcBoxOne = empty;
    $rootScope.showCartTriger = false;
    $rootScope.sortBy = 'new';
    $rootScope.changeShit = function(e){
    }
    $rootScope.scrollToTop = function () {  
        window.scrollTo(0,0);
    }
    $rootScope.togglePrice=true;
    $rootScope.toggleColor=true;
    $rootScope.toggleSize=true;
    $http.get('/client/api/request/data/allData')
        .then((data)=>{
            $rootScope.mens = data.data.menData;
            $rootScope.womens = data.data.womensData;
            $rootScope.access = data.data.access;
            $rootScope.amount = (data.data.menData.length + data.data.womensData.length + data.data.access.length);
        });
    $rootScope.details;
    $rootScope.cartItemList=[];
    $rootScope.fefresh = function(){
        window.location.reload();
    }
    $rootScope.back = function(){
        window.history.back();
    }
    $rootScope.showCartTriger = function () {
        angular.element(document.querySelector('.sise-carts-container')).toggleClass('showCart');
        angular.element(document.querySelector('.closingarts')).toggleClass('disblock');
    }

    let shit=0;
    $rootScope.addedItem = function(item){
        $rootScope.cartItemList.push(item);
        shit += item.ourPrice;
        $rootScope.totalCost = shit;
    }
    $rootScope.removeFromCarts = function (ids) {
        for (let i = 0; i < $rootScope.cartItemList.length; i++) {
            if ($rootScope.cartItemList[i]._id === ids) {
                $rootScope.totalCost = $rootScope.totalCost - $rootScope.cartItemList[i].ourPrice;
                $rootScope.cartItemList.splice(i,1);
                if ($rootScope.cartItemList.length < 1) {
                    shit = 0;
                    $rootScope.totalCost = shit;
                }
            }
        }
    }
    $rootScope.totalCost = shit;
    $rootScope.hovering = function(e){
    }
    $rootScope.mobileSearchTriger = true;
    $rootScope.mobileNaveSerach = function () {
        angular.element(document.querySelector('.search-box-for-mobile')).css({
            'width':'100%',
            'padding':'0 20px 0 20px'
        });
        angular.element(document.querySelector('.search-output')).css({
            'display':'block' 
        });
    }
    $rootScope.mobileNaveSerachc = function () {
        angular.element(document.querySelector('.search-box-for-mobile')).css({
            'width':'0%',
            'padding':'0px'
        });
        angular.element(document.querySelector('.search-output')).css({
            'display':'none'
        });
    }
});


// search output

app.controller('SearchOutput', ($scope) => {});
// for mens route

app.controller('onlymens',function($scope,$rootScope,$http){
    $scope.thisPage = [ "#!Mens-All", "Mens" ];
    $http.get(`/client/api/request/data/allData`)
        .then((data)=>{
            
            $rootScope.mens = data.data.menData;
        });
});

app.controller('mensCatogery',function($scope,$rootScope,$http,$routeParams){
    let catagory = $routeParams.catagory;
    $scope.catogery = catagory;
    $scope.thisPage = [ "#!Mens-All", "Mens" ];
    $http.get(`/client/api/request/data/mens/${catagory}`)
        .then((data)=>{
            
            $scope.mens = data.data;
        });
});

// for womens route

app.controller('onlywomens',function($scope,$rootScope,$http){
    $scope.thisPage = [ "#!Womens-All", "Womens"];
    $http.get(`/client/api/request/data/allData`)
        .then((data)=>{
            
            $rootScope.womens = data.data.womensData;
        });
});
app.controller('womensCatogery',function($scope,$rootScope,$http,$routeParams){
    let catagory = $routeParams.catagory;
    $scope.catogery = catagory;
    $scope.thisPage = [ "#!Womens-All", "womens"];
    
    $http.get(`/client/api/request/data/womens/${catagory}`)
        .then((data)=>{
            
            $scope.womens = data.data;
        });
});

// for accessories route

app.controller('onlyAccessories',function($scope,$rootScope,$http){
    $scope.thisPage = [ "#!Accessories-All", "Accessories" ];
    $http.get(`/client/api/request/data/allData`)
        .then((data)=>{
            
            $rootScope.mens = data.data.menData;
        });
});



app.controller('main-ctrl',function($scope,$rootScope,$http){
    $scope.searchTriger = false;
    $rootScope.details;

});
app.controller('details-ctrl' , function($scope,$routeParams,$rootScope,$http){
    let shit = $routeParams.id;
    let defimg;
    $http.get(`/client/api/request/data/getOne/${shit}`)
        .then((data)=>{
            
            $scope.details = data.data;
            $scope.mainImg = data.data.img[0];
        });
    $scope.selectedImg = function(ints){
        
        $scope.mainImg = ints;
    }
    $scope.trigerToster = function () {
        let Toster = angular.element(document.querySelector('.fave-toster'));
        Toster.addClass('tramslate-0');
        setTimeout(() => {
            
            Toster.removeClass('tramslate-0');
        }, 3000);
    }
});

app.controller('sebscribe',function($scope,$rootScope){

});

app.controller('allDress',function($scope){
    $scope.shit="bullshit"
});

app.controller('allDressfilter',function($scope,$rootScope,$http){});

app.controller('Dressfilter',function($scope,$rootScope,$http){
    $scope.shit="test123"

    if ( window.innerWidth > 600) {
        $rootScope.carosels = {
            one:'/assets/page/carosel/desk/img1.jpg',
            two:'/assets/page/carosel/desk/img2.jpg',
            three:'/assets/page/carosel/desk/img3.jpg',
            four:'/assets/page/carosel/desk/img4.jpg',
            five:'/assets/page/carosel/desk/img5.jpg'
        };
    } else {
        $rootScope.carosels = {
            one:'/assets/page/carosel/mobi/img1.jpg',
            two:'/assets/page/carosel/mobi/img2.jpg',
            three:'/assets/page/carosel/mobi/img3.jpg',
            four:'/assets/page/carosel/mobi/img4.jpg',
            five:'/assets/page/carosel/mobi/img5.jpg'
        };
    }


    function colorPicker(whichs,colo){

        $http.get('/client/api/request/data/allData')
            .then((data)=>{
                $rootScope.mens = data.data.menData;
                $rootScope.womens = data.data.womensData;
                $rootScope.access = data.data.access;
                $rootScope.amount = (data.data.menData.length + data.data.womensData.length + data.data.access.length);
                let poop=[];
                let poop1=[];
                let poop2=[];
                this.color = colo;
                this.whichs = whichs;
                
                $rootScope.mens.forEach((men)=>{
                    if(this.whichs == 'color'){
                        men.colorValue.forEach((col)=>{
                            if (col == this.color) {
                                poop.push(men);
                                
                                $rootScope.mens = poop;
                            }
                        });
                    }
                    else{
                        men.itemSize.forEach((col)=>{
                            if (col == this.color) {
                                poop.push(men);
                                
                                $rootScope.mens = poop;
                            }
                        });
                    }
                });
                $rootScope.womens.forEach((men)=>{
                    if(this.whichs == 'color'){
                        men.colorValue.forEach((col)=>{
                            if (col == this.color) {
                                poop1.push(men);
                                
                                $rootScope.womens = poop1;
                            }
                        });
                    }
                    else{
                        men.itemSize.forEach((col)=>{
                            if (col == this.color) {
                                poop1.push(men);
                                
                                $rootScope.womens = poop1;
                            }
                        });
                    }
                });
                $rootScope.access.forEach((men)=>{
                    if(this.whichs == 'color'){
                        men.colorValue.forEach((col)=>{
                            if (col == this.color) {
                                poop2.push(men);
                                
                                $rootScope.access = poop2;
                            }
                        });
                    }
                    else{
                        men.itemSize.forEach((col)=>{
                            if (col == this.color) {
                                poop2.push(men);
                                
                                $rootScope.access = poop2;
                            }
                        });
                    }
                });
        });
    }

    $rootScope.colorPicker_red = function(){
        new colorPicker('color','red');
    }
    $rootScope.colorPicker_yellow = function(){
        new colorPicker('color','yellow');
    }
    $rootScope.colorPicker_white = function(){
        new colorPicker('color','white');
    }
    $rootScope.colorPicker_violet = function(){
        new colorPicker('color','violet');
    }
    $rootScope.colorPicker_pink = function(){
        new colorPicker('color','pink');
    }
    $rootScope.colorPicker_orange = function(){
        new colorPicker('color','orange');
    }
    $rootScope.colorPicker_green = function(){
        new colorPicker('color','green');
    }
    $rootScope.colorPicker_black = function(){
        new colorPicker('color','black');
    }
    $rootScope.colorPicker_blue = function(){
        new colorPicker('color','blue');
    }
    $rootScope.colorPicker_grey = function(){
        new colorPicker('color','grey');
    }
    $rootScope.sizeS = function(){
        new colorPicker('size','S');
    }
    $rootScope.sizeM = function(){
        new colorPicker('size','M');
    }
    $rootScope.sizeL = function(){
        new colorPicker('size','L');
    }
    $rootScope.sizeXL = function(){
        new colorPicker('size','XL');
    }

 
});

app.controller('footer-ctrl',function($scope,$http){
    $scope.eMailId;
    $scope.sendMail = function(mail){
        
        $http.post(`/client/api/request/data/sendMail/${mail}`)
            .then((data)=>{
                if (data.status === 200) {
                    $scope.eMailId="";
                    
                    let tog = angular.element(document.querySelector('.res-to-sub'));
                    tog.addClass('tramslate-0');
                    setTimeout(() => {
                        tog.removeClass('tramslate-0');
                    }, 3000);
                }
        });
    }

    $scope.isMobile = false;
    if (window.innerWidth < 600 ) {
        $scope.isMobile = true;
    }
    
});

app.controller('dealsPage',function ($scope,$http){
    $scope.brands = [
        "/assets/page/brand-logo/100yellow.png",
        "/assets/page/brand-logo/addidas.png",
        "/assets/page/brand-logo/ajio.png",
        "/assets/page/brand-logo/aliexpress.png",
        "/assets/page/brand-logo/amazon.in.png",
        "/assets/page/brand-logo/andindia.png",
        "/assets/page/brand-logo/aristocrat.png",
        "/assets/page/brand-logo/badtamees.png",
        "/assets/page/brand-logo/bata.png",
        "/assets/page/brand-logo/biba.png",
        "/assets/page/brand-logo/bluestone.png",
        "/assets/page/brand-logo/capresebags.png",
        "/assets/page/brand-logo/carlton.png",
        "/assets/page/brand-logo/charleskeith.png",
        "/assets/page/brand-logo/chumbak.png",
        "/assets/page/brand-logo/clovia.png",
        "/assets/page/brand-logo/coolwinks.png",
        "/assets/page/brand-logo/crocs.png",
        "/assets/page/brand-logo/dailyobjects.png",
        "/assets/page/brand-logo/decathlon.png",
        "/assets/page/brand-logo/dresslily.png",
        "/assets/page/brand-logo/exclusivelane.png",
        "/assets/page/brand-logo/EZMall.png",
        "/assets/page/brand-logo/Fabindia.png",
        "/assets/page/brand-logo/flipkart.png",
        "/assets/page/brand-logo/giftalove.png",
        "/assets/page/brand-logo/Giftsmate.png",
        "/assets/page/brand-logo/gocolors.png",
        "/assets/page/brand-logo/haanum.png",
        "/assets/page/brand-logo/Hijabenka.png",
        "/assets/page/brand-logo/Homeshop18.png",
        "/assets/page/brand-logo/iBhejo.png",
        "/assets/page/brand-logo/igp.png",
        "/assets/page/brand-logo/India Cir.png",
        "/assets/page/brand-logo/iomoto.png",
        "/assets/page/brand-logo/jabong.png",
        "/assets/page/brand-logo/jockey.png",
        "/assets/page/brand-logo/john jac",
        "/assets/page/brand-logo/kalki.png",
        "/assets/page/brand-logo/koovs.png",
        "/assets/page/brand-logo/lenskart.png",
        "/assets/page/brand-logo/liberty.png",
        "/assets/page/brand-logo/lifestyle.png",
        "/assets/page/brand-logo/limeroad.png",
        "/assets/page/brand-logo/lovzme.png",
        "/assets/page/brand-logo/markryden.png",
        "/assets/page/brand-logo/maurices.png",
        "/assets/page/brand-logo/maxfashion.png",
        "/assets/page/brand-logo/mdreams.png",
        "/assets/page/brand-logo/melorra.png",
        "/assets/page/brand-logo/mydreamstore.png",
        "/assets/page/brand-logo/myntra.png",
        "/assets/page/brand-logo/nnnow.png",
        "/assets/page/brand-logo/planetsuperheroes.png",
        "/assets/page/brand-logo/prettysecrets.png",
        "/assets/page/brand-logo/reddressboutique.png",
        "/assets/page/brand-logo/reebok.png",
        "/assets/page/brand-logo/shein.png",
        "/assets/page/brand-logo/shopclues.png",
        "/assets/page/brand-logo/shoppersstop.png",
        "/assets/page/brand-logo/snapdeal.png",
        "/assets/page/brand-logo/StyleFiesta.png",
        "/assets/page/brand-logo/tatacliq.png",
        "/assets/page/brand-logo/thelabellife.png",
        "/assets/page/brand-logo/themancompany.png",
        "/assets/page/brand-logo/velvetcase.png",
        "/assets/page/brand-logo/voylla.png",
        "/assets/page/brand-logo/wildcaraft.png",
        "/assets/page/brand-logo/zivame.png"
    ];
    
    $http.get('/client/api/request/data/deals')
        .then((data)=>{
            $scope.data = data.data;
        });
    function deals(ofwhich){
        this.shit = ofwhich;
        $http.get(`/client/api/request/data/deals/${this.shit}`)
        .then(data=>{
            $scope.data = data.data;
        });
    }
    $scope.all = function(){
        $http.get('/client/api/request/data/deals')
            .then((data)=>{
                $scope.data = data.data;
            });
    }
    $scope.WomensCatogery = function (){
        new deals('women');
    }
    $scope.MensCatogery = function (){
        new deals('men');
    }
    $scope.AccessoriesCatogery = function (){
        new deals('accessories');
    }
    $scope.SunglassCatogery = function (){
        new deals('sunglass');
    }
    $scope.FootwearCatogery = function (){
        new deals('sunglass');
    }
    $scope.BagesCatogery = function (){
        new deals('bages');
    }
    $scope.GiftCatogery = function (){
        new deals('gifts');
    }
    $scope.JewelleryCatogery = function (){
        new deals('jewellery');
    }
});


app.controller('coupensPage',function ($scope,$http,$rootScope){
    $scope.brands = [
        "/assets/page/brand-logo/100yellow.png",
        "/assets/page/brand-logo/addidas.png",
        "/assets/page/brand-logo/ajio.png",
        "/assets/page/brand-logo/aliexpress.png",
        "/assets/page/brand-logo/amazon.in.png",
        "/assets/page/brand-logo/andindia.png",
        "/assets/page/brand-logo/aristocrat.png",
        "/assets/page/brand-logo/badtamees.png",
        "/assets/page/brand-logo/bata.png",
        "/assets/page/brand-logo/biba.png",
        "/assets/page/brand-logo/bluestone.png",
        "/assets/page/brand-logo/capresebags.png",
        "/assets/page/brand-logo/carlton.png",
        "/assets/page/brand-logo/charleskeith.png",
        "/assets/page/brand-logo/chumbak.png",
        "/assets/page/brand-logo/clovia.png",
        "/assets/page/brand-logo/coolwinks.png",
        "/assets/page/brand-logo/crocs.png",
        "/assets/page/brand-logo/dailyobjects.png",
        "/assets/page/brand-logo/decathlon.png",
        "/assets/page/brand-logo/dresslily.png",
        "/assets/page/brand-logo/exclusivelane.png",
        "/assets/page/brand-logo/EZMall.png",
        "/assets/page/brand-logo/Fabindia.png",
        "/assets/page/brand-logo/flipkart.png",
        "/assets/page/brand-logo/giftalove.png",
        "/assets/page/brand-logo/Giftsmate.png",
        "/assets/page/brand-logo/gocolors.png",
        "/assets/page/brand-logo/haanum.png",
        "/assets/page/brand-logo/Hijabenka.png",
        "/assets/page/brand-logo/Homeshop18.png",
        "/assets/page/brand-logo/iBhejo.png",
        "/assets/page/brand-logo/igp.png",
        "/assets/page/brand-logo/India Cir.png",
        "/assets/page/brand-logo/iomoto.png",
        "/assets/page/brand-logo/jabong.png",
        "/assets/page/brand-logo/jockey.png",
        "/assets/page/brand-logo/john jac",
        "/assets/page/brand-logo/kalki.png",
        "/assets/page/brand-logo/koovs.png",
        "/assets/page/brand-logo/lenskart.png",
        "/assets/page/brand-logo/liberty.png",
        "/assets/page/brand-logo/lifestyle.png",
        "/assets/page/brand-logo/limeroad.png",
        "/assets/page/brand-logo/lovzme.png",
        "/assets/page/brand-logo/markryden.png",
        "/assets/page/brand-logo/maurices.png",
        "/assets/page/brand-logo/maxfashion.png",
        "/assets/page/brand-logo/mdreams.png",
        "/assets/page/brand-logo/melorra.png",
        "/assets/page/brand-logo/mydreamstore.png",
        "/assets/page/brand-logo/myntra.png",
        "/assets/page/brand-logo/nnnow.png",
        "/assets/page/brand-logo/planetsuperheroes.png",
        "/assets/page/brand-logo/prettysecrets.png",
        "/assets/page/brand-logo/reddressboutique.png",
        "/assets/page/brand-logo/reebok.png",
        "/assets/page/brand-logo/shein.png",
        "/assets/page/brand-logo/shopclues.png",
        "/assets/page/brand-logo/shoppersstop.png",
        "/assets/page/brand-logo/snapdeal.png",
        "/assets/page/brand-logo/StyleFiesta.png",
        "/assets/page/brand-logo/tatacliq.png",
        "/assets/page/brand-logo/thelabellife.png",
        "/assets/page/brand-logo/themancompany.png",
        "/assets/page/brand-logo/velvetcase.png",
        "/assets/page/brand-logo/voylla.png",
        "/assets/page/brand-logo/wildcaraft.png",
        "/assets/page/brand-logo/zivame.png"
    ];
    
    $scope.data;
    $http.get('/client/api/request/data/coupens')
        .then((data)=>{
            
            $scope.data = data.data;
        });
        function deals(ofwhich){
            this.shit = ofwhich;
            $http.get(`/client/api/request/data/coupens/${this.shit}`)
            .then(data=>{
                
                $scope.data = data.data;
            });
        }
        $scope.all = function(){
            $http.get('/client/api/request/data/coupens')
                .then((data)=>{
                    
                    $scope.data = data.data;
                });
        }
        $scope.WomensCatogery = function (){
            new deals('women');
        }
        $scope.MensCatogery = function (){
            new deals('men');
        }
        $scope.AccessoriesCatogery = function (){
            new deals('accessories');
        }
        $scope.SunglassCatogery = function (){
            new deals('sunglass');
        }
        $scope.FootwearCatogery = function (){
            new deals('sunglass');
        }
        $scope.BagesCatogery = function (){
            new deals('bages');
        }
        $scope.GiftCatogery = function (){
            new deals('gifts');
        }
        $scope.JewelleryCatogery = function (){
            new deals('jewellery');
        }
        $scope.thisisshit = function(ids){
            
            $scope.data.forEach(shit=>{
                if (shit._id == ids) {
                    $rootScope.shits = shit;
                }
            })
        }
});

app.controller('coupensDetails',function($rootScope){
    $rootScope.shits;
});

app.controller('whichCatogery',function($scope,$routeParams,$http){
    let which = $routeParams.cato;
    
    $http.get(`/client/api/request/data/shop/catogery/${which}`)
    .then(data=>{
        
        $scope.data = data.data;
    })
    .catch(err=>{
        console.log(err);
    })
});


app.filter('priceFilter',function(){
    return (item, priceF)=>{
        let filtered = [];
        let rs = priceF;

        item.forEach((ant)=>{
            if (ant.ourPrice < rs) {
                filtered.push(ant);
            }
        });
        return filtered;
    };
});

app.filter('sizeFilter',function(){
    return ( item ) => {
        let filtered = [];
    }
});

