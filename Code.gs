function onFormSubmit(e) {
  var student = getLatestFormResponse();
  putDataOnDataTab(student);
}



/*
 * Get the most recent form response object from a Google Form.
 * To learn more about what to do with the formResponse, see:
 * https://developers.google.com/apps-script/reference/forms/form-response
 */
function getLatestFormResponse() {
  
  var tempTimeZone = "EDT"
  
  var form = FormApp.getActiveForm();
  var latestFormResponse = form.getResponses().slice(-1)[0];
  var itemResponses = latestFormResponse.getItemResponses();
  var dateTime = latestFormResponse.getTimestamp();
  
  
  var student = {
    email: latestFormResponse.getRespondentEmail(),
    selectedName: itemResponses[0].getResponse(),
    mood: itemResponses[1].getResponse(),
    date: Utilities.formatDate(dateTime, tempTimeZone, "yyyy-MM-dd"),
    time: Utilities.formatDate(dateTime, tempTimeZone, "KK:mm a"),
    day: Utilities.formatDate(dateTime, tempTimeZone, "EEE"),
    month: Utilities.formatDate(dateTime, tempTimeZone, "MMM"),
    weekNumber: Utilities.formatDate(dateTime, tempTimeZone, "W"),
    weekOf: ''
    
  }
  var weekOfDate = new Date(dateTime);
  switch (student.day) {
    case 'Mon': student.weekOf = student.date; break;
    case 'Tue':
      var tue = weekOfDate;
      tue.setDate(tue.getDate()-1);
      student.weekOf = tue; break;
    case 'Wed': 
      var wed = weekOfDate;
      wed.setDate(wed.getDate()-1);
      student.weekOf = wed; break;
    case 'Thu': 
      var thu = weekOfDate;
      thu.setDate(thu.getDate()-1);
      student.weekOf = thu; break;
    case 'Fri': 
      var fri = weekOfDate;
      fri.setDate(fri.getDate()-1);
      student.weekOf = fri; break;
  }
  
  return student;
}

function putDataOnDataTab(student) {
  var SS = SpreadsheetApp.openById('1ySTDZ6s_VRIGl64aaHOWQw60W6K0Yt3cRwdA-oOCHDM');
  var dataSheet = SS.getSheetByName('Data');
  var lastRowWithData = dataSheet.getLastRow() + 1;
  var data = [ student.email, student.selectedName, student.mood, student.date, student.time, student.day, student.month, student.weekNumber, student.weekOf ];
  var range = dataSheet.getRange('A' + lastRowWithData + ':I' + lastRowWithData).setValues([data]);
}