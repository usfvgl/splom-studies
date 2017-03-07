var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [ // EDIT THESE
      'postId',
      // experiment-wide timing
      'timestamp',
      "time_start_experiment",
      "time_end_experiment",
      'time_diff_experiment',
      // section timing
      "time_diff_section1_intro",
      "time_diff_section1_train_static",
      "time_diff_section1_train_animated",
      "time_diff_section_break",
      "time_diff_section2_intro",
      "time_diff_section2_train_static",
      "time_diff_section2_train_animated",
      // demographics
      'age',
      'sex',
      'degree',
      'splot_comfort',
      'splom_comfort',
      // section 1 data order
      "data_1_1_order",
      "data_1_2_order",
      "data_1_3_order",
      "data_1_4_order",
      "data_1_5_order",
      "data_1_6_order",
      // section 1 animation
      "data_1_1_animated",
      "data_1_2_animated",
      "data_1_3_animated",
      "data_1_4_animated",
      "data_1_5_animated",
      "data_1_6_animated",
      // section 1 points
      "data_1_1_points",
      "data_1_2_points",
      "data_1_3_points",
      "data_1_4_points",
      "data_1_5_points",
      "data_1_6_points",
      // section 1 classes
      "data_1_1_classes",
      "data_1_2_classes",
      "data_1_3_classes",
      "data_1_4_classes",
      "data_1_5_classes",
      "data_1_6_classes",
      // section 1 timing
      "time_diff_data_1_1",
      "time_diff_data_1_2",
      "time_diff_data_1_3",
      "time_diff_data_1_4",
      "time_diff_data_1_5",
      "time_diff_data_1_6",
      // section 1 debug
      "data_1_1_var1",
      "data_1_1_var2",
      "data_1_1_var1_range",
      "data_1_1_var2_range",
      "data_1_2_var1",
      "data_1_2_var2",
      "data_1_2_var1_range",
      "data_1_2_var2_range",
      "data_1_3_var1",
      "data_1_3_var2",
      "data_1_3_var1_range",
      "data_1_3_var2_range",
      "data_1_4_var1",
      "data_1_4_var2",
      "data_1_4_var1_range",
      "data_1_4_var2_range",
      "data_1_5_var1",
      "data_1_5_var2",
      "data_1_5_var1_range",
      "data_1_5_var2_range",
      "data_1_6_var1",
      "data_1_6_var2",
      "data_1_6_var1_range",
      "data_1_6_var2_range",
      // section 2 data order
      "data_2_1_order",
      "data_2_2_order",
      "data_2_3_order",
      "data_2_4_order",
      "data_2_5_order",
      "data_2_6_order",
      // section 2 animation
      "data_2_1_animated",
      "data_2_2_animated",
      "data_2_3_animated",
      "data_2_4_animated",
      "data_2_5_animated",
      "data_2_6_animated",
      // section 2 points
      "data_2_1_points",
      "data_2_2_points",
      "data_2_3_points",
      "data_2_4_points",
      "data_2_5_points",
      "data_2_6_points",
      // section 2 classes
      "data_2_1_classes",
      "data_2_2_classes",
      "data_2_3_classes",
      "data_2_4_classes",
      "data_2_5_classes",
      "data_2_6_classes",
      // section 2 timing
      "time_diff_data_2_1",
      "time_diff_data_2_2",
      "time_diff_data_2_3",
      "time_diff_data_2_4",
      "time_diff_data_2_5",
      "time_diff_data_2_6",
      // section 2 debug
      "data_2_1_var1",
      "data_2_1_var2",
      "data_2_1_var1_range",
      "data_2_1_var2_range",
      "data_2_2_var1",
      "data_2_2_var2",
      "data_2_2_var1_range",
      "data_2_2_var2_range",
      "data_2_3_var1",
      "data_2_3_var2",
      "data_2_3_var1_range",
      "data_2_3_var2_range",
      "data_2_4_var1",
      "data_2_4_var2",
      "data_2_4_var1_range",
      "data_2_4_var2_range",
      "data_2_5_var1",
      "data_2_5_var2",
      "data_2_5_var1_range",
      "data_2_5_var2_range",
      "data_2_6_var1",
      "data_2_6_var2",
      "data_2_6_var1_range",
      "data_2_6_var2_range",
      // conclusion
      "static_interpret",
      "animated_interpret",
      "distracting",
      "technique_preference",
      'comments'
    ]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)

  data = JSON.parse(data)

  // handles optional comments field
  data.forEach(function(row) {
	  if (!row.comments) {
		  row.comments = " ";
	  }
  });

  // filters any undefined data (it makes R scripting easier)
  data = filterUndefined(data)

  // use 'debug' for your workerId when testing experiments,
  //   comment out if you want to analyze data from yourself
  data = filterDebug(data)

  convert( data )
})

function convert(d) {
  var params = {
    data: d,
    fields: fields
  }
  j2c(params, function(err, csv) {
    if (err) console.log(err)
    console.log(csv)
  })
}

function filterUndefined (arr) {
  return _.filter(arr, function(row) {
    return _.every(fields, function(f) { return row[f] })
  })
}

function filterDebug (arr) {
  return _.filter(arr, function(row) {
    return row.workerId !== 'debug'
  })
}
