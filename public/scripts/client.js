$(function() {
  
  // catch the form submit
  // prevent form submission
  // extract the search keyword
  // create a request to the tvmaze API
  // with the results => create the HTML element => attach to the DOM

  $(window).scroll(() => {
    if ($(window).scrollTop() > 400) {
      $("#scroll_button").css("display", "block");
    } else {
      $("#scroll_button").css("display", "none");
    }
  })

  $("#scroll_button").click(() => {
    $('html').animate({scrollTop: '0px'}, 400);
  })


  const addGenre = (genres) => {
    let addData = '';
    for (const genre of genres) {
      addData += `<span>${genre}</span> `
    }
    return addData;
  }

  const addList = (dataFromAPI) => {
    $('span').remove();
    
    for (const data of dataFromAPI) {
      const img = data.show.image.medium || "/img/no-img.png";
      const channelName = data.show.webChannel ? data.show.webChannel.name : "N/A"
      const runningStatus = data.show.status || "N/A"

      const result = `
        <li class="media">
          <img src=${img}>
          <div class="media-body">
            <div class="media_title">
              <h5>${data.show.name}</h5>
              <p>(${channelName}, ${runningStatus})</p>
            </div>
            
            <p>${addGenre(data.show.genres)}</p>
            <ul class="media-info">
              <li>Premiered: ${data.show.premiered || 'no information'}</li>
              <li>Rating: ${data.show.rating.average || 'no information'}</li>
              <li>Runtime: ${data.show.runtime || 'no information'}</li>
            </ul>
          </div>
        </li>`
        $('#search-results').append(result);
    }

  }


  
  $('#search_frm').on('submit', function(event) {
    // prevent form submission
    event.preventDefault();
    // console.log("form submit");
    
    /*
    * extract the search keyword
    * * when there's no id
    * * const inputBox = $(this).children('input[type="search"]');
    * */
   const inputBox = $('#search_text');
   const searchTerm = inputBox.val();
   // console.log(searchTerm);
   const url =  `https://api.tvmaze.com/search/shows?q=${searchTerm}`;


    // sending the request to the tvmaze API
    $.ajax({
      url: url,
      method: 'GET'
    })
      .done(results => {
        $('.media').remove();
        // console.log(results[1])
        // with the results => create the HTML element => attach to the DOM
        addList(results);
      })
      .fail(error => console.log(`Error: ${error.message}`))
      .always(()=> console.log("request to TV Maze done"));

      $('#search_text').val('');
  })


})