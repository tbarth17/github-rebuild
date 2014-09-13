function renderTemplate(templateId, container, model){
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).append(renderedTemplate);
}


/*topBar*/
$.getJSON("https://api.github.com/users/tbarth17").done(function(user){
  var userData = {
      userAvatar: user.avatar_url,
      userId: user.login,
      userUrl: user.html_url};
    renderTemplate('topBar', '.topBarContainer', userData);
});

/*userBar-side*/
$.getJSON("https://api.github.com/users/tbarth17").done(function(user){
  var userData = {
      userAvatar: user.avatar_url,
      userName: user.name,
      userId: user.login,
      userUrl: user.html_url,};
          renderTemplate("user", ".userBar", userData);
});

$.getJSON("https://api.github.com/users/tbarth17").done(function(user){
  var userData = {
      joinedDate: moment(user.created_at).format("MMM-Do-YYYY")};
    renderTemplate("joined", ".joinedContainer", userData);
  });

$.getJSON("https://api.github.com/users/tbarth17").done(function(user){
  var userData = {
      followersUrl: user.followers_url,
      followersNumber: user.followers,
      starredUrl: user.starred_url,
      followingUrl: user.following_url,
      followingNumber: user.following};
        $.getJSON("https://api.github.com/users/tbarth17/starred" ).done(function(starlength){
          userData.starredNumber =  starlength.length;
    renderTemplate("followStarFollowing", ".followStarContainer", userData);
 });
});

$.getJSON("https://api.github.com/users/tbarth17/orgs" ).done(function(orgs){
  _.map(orgs, function(pull){
  var orgData = {
      organizationsImg:  pull.avatar_url,
      organizationsName: pull.login
      };
    renderTemplate("organizations", ".organizationsContainer", orgData);
  });
});

$.getJSON("https://api.github.com/users/tbarth17/repos").done(function(repos){
 var sortedData = _.sortBy(repos, 'updated_at').reverse();
  _.each(sortedData, function(pull) {
    var repoData = {
      repoUrl: pull.html_url,
      repoTitle: pull.name,
      languageType: pull.language,
      stargazerUrl: pull.stargazers_url,
      stargazerCount: pull.stargazers_count,
      forksUrl: pull.forksUrl,
      forksCount: pull.forks,
      timeSince: moment(pull.updated_at).fromNow()
    };
    renderTemplate('repo', '.repoListingContainer', repoData);
  });
});
