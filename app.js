/***********************************************************
 Object to hold search params for API call
 ************************************************************/
var searchParams = {
    url:'https://www.googleapis.com/youtube/v3/search',
    part: 'snippet',
    key: 'AIzaSyDFC4NpVKDzIge2MeJ4HUKcm8_PLA3-OCc',
    q:'',
    pageT:''
}


/***********************************************************
 UI Renderer using the data returned.
 ************************************************************/
function displayYTSearchData(data) {
    var str = ''
    $('.video-list').empty();

    //console.log(data.prevPageToken)
    console.log("prev token" + data.prevPageToken)
    console.log("next token" + data.nextPageToken)
    if(typeof data.prevPageToken !==  'undefined' &&  data.prevPageToken.length!==0)
    {
        console.log("inside prev")
        $('.video-nav-prev').show()
        $('.video-nav-prev').attr("href", data.prevPageToken)
        //console.log($('.video-nav-prev'))
    }
    else
        $('.video-nav-prev').hide()
    if(typeof data.nextPageToken !==  'undefined' &&  data.nextPageToken.length!==0)
    {
        console.log("inside next")
        $('.video-nav-next').show()
        $('.video-nav-next').attr("href", data.nextPageToken)
        // console.log($('.video-nav-next'))
    }
    else
        $('.video-nav-next').hide()

    if (data.items) {
        data.items.forEach(function(item) {
            //console.log(item.snippet.title + "-" + item.snippet.channelId)
            str = '<div class="video-list-item"><div class="video-img"><a class="video-link" href="https://www.youtube.com/watch?v='+   item.id.videoId + '"><img  src="' + item.snippet.thumbnails.default.url + '" alt="' + item.snippet.title +'" target="_blank"></a></div>'+
                '<div class="video-info"><span class="video-item">' + item.snippet.title + '</span>'+
                '<span class="channel-item">' +
                '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" alt="' + item.snippet.title +'" target="_blank">More from source channel!!</a></span></div></div>'
            $('.video-list').append(str);
        });
    }
    else {
        resultElement += '<p>No results</p>';
    }
}

/***********************************************************
 Processor function to load data from API
 ************************************************************/

function getDataFromApi(searchParams, callback) {
    var query = {
        part: searchParams.part,
        key: searchParams.key,
        q:searchParams.q
    }
    if(searchParams.pageT.length!==0)
        query.pageToken=searchParams.pageT;

    //console.log(query)
    $.getJSON(searchParams.url, query, callback);
}

/***********************************************************
Event Listeners
 ************************************************************/

//Form submit listener
function watchSubmit() {
    $('.js-video-search-form').submit(function(e) {
        e.preventDefault();
        var query = $(this).find('#search-string').val();
        searchParams.q = query
        getDataFromApi(searchParams, displayYTSearchData);
    });
}

//Navigation Listener for Next link
$('.video-nav-next').click(function (e) {
        e.preventDefault()
        searchParams.pageT=this.getAttribute('href')
        getDataFromApi(searchParams, displayYTSearchData);

})

//Navigation Listener for Prev link
$('.video-nav-prev').click(function (e) {
    e.preventDefault()
    searchParams.pageT=this.getAttribute('href')
    getDataFromApi(searchParams, displayYTSearchData);

})

//Initialization on page load
$(function(){
//    console.log($('.video-nav-prev'))
    $('.video-nav-prev').hide()
    $('.video-nav-next').hide()
    watchSubmit()

});