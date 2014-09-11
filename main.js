//var stargazerImg: pull.
//var forksImg:

var sortedData = _.sortBy(repodata, 'updated_at').reverse();


var models =  _.map(sortedData, function(pull){
  return {
  repoUrl: pull.html_url,
  repoTitle: pull.name,
  languageType: pull.language,
  stargazerUrl: pull.stargazers_url,
  stargazerCount: pull.stargazers_count,
  forksUrl: pull.forksUrl,
  forksCount: pull.forks,
  timeSince: moment(pull.updated_at).fromNow(),
};
});

_.each(models, function(i){
  var templateString = $('#templates-listing').text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(i);
  $('.repoListingContainer').append(renderedTemplate);
});
