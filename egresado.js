'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const axios = require('axios');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers:', request.headers);
  console.log('Dialogflow Request body:', request.body);

  function welcome(agent) {
    agent.add('Welcome to my agent!');
  }

  function fallback(agent) {
    const queryText = request.body.queryResult.queryText;
    return axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=failed', {
      data: {
        content: queryText,
      },
    })
      .then(response => {
        console.log('Successful POST request:', response.data);
        agent.add('I did not understand. Could you please repeat?');
      })
      .catch(error => {
        console.error('Error in POST request:', error);
        agent.add('I did not understand. Could you please repeat?');
      });
  }

  function graduated(agent) {
    const {
      Dni,
      Firstname,
      Lastname,
      Secondname,
      Sexo,
      Email,
      Phonenumber,
      placeofbirth,
      Address,
      disability,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=graduated', {
      data: {
        Dni,
        Firstname,
        Lastname,
        Secondname,
        Sexo,
        Email,
        Phonenumber,
        placeofbirth,
        Address,
        disability,
      },
    });
  }

  function academic(agent) {
    const {
      career,
      specialty,
      yearofincome,
      bachelor,
      professionaldegree,
      master,
      masteruniversity,
      doctor,
      druniversity,
      Yearbachelor,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=academic', {
      data: {
        career,
        specialty,
        yearofincome,
        bachelor,
        professionaldegree,
        master,
        masteruniversity,
        doctor,
        druniversity,
        Yearbachelor,
      },
    });
  }

  function firstOffer(agent) {
    const {
      jobs,
      timeJob,
      media,
      difficultiesJob,
      workstation,
      firstRemuneration,
      firstCompany,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=firstjob', {
      data: {
        jobs,
        timeJob,
        media,
        difficultiesJob,
        workstation,
        firstRemuneration,
        firstCompany,
      },
    });
  }

  function currently(agent) {
    const {
      employmentsituation,
      workspecialty,
      companytype,
      remuneration,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=currently', {
      data: {
        employmentsituation,
        workspecialty,
        companytype,
        remuneration,
      },
    });
  }

  function informationCompany(agent) {
    const {
      companyname,
      region,
      economicactivity,
      Webpage,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=InformationCompanyWork', {
      data: {
        companyname,
        region,
        economicactivity,
        Webpage,
      },
    });
  }

  function typeCompany(agent) {
    const {
      dateofadmission,
      businesscategory,
      Positioninthecompany,
      remuneration,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=typeCompany', {
      data: {
        dateofadmission,
        businesscategory,
        Positioninthecompany,
        remuneration,
      },
    });
  }

  function InformationBusiness(agent) {
    const {
      companyconstitution,
      entrepreneurship,
      numberWorkers,
      companycreation,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=InformationBusiness', {
      data: {
        companyconstitution,
        entrepreneurship,
        numberWorkers,
        companycreation,
      },
    });
  }

  function employment(agent) {
    const {
      NumberEmployees,
      averageTime,
      mediumEffective,
      difficultiesGetting,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=employment', {
      data: {
        NumberEmployees,
        averageTime,
        mediumEffective,
        difficultiesGetting,
      },
    });
  }

  function relationship(agent) {
    const {
      stake,
      universitysupport,
      announcement,
      followUp,
      Actions,
      universityInformation,
    } = agent.parameters;

    axios.post('https://sheetdb.io/api/v1/sevoumzxzltfk?sheet=relationship', {
      data: {
        stake,
        universitysupport,
        announcement,
        followUp,
        Actions,
        universityInformation,
      },
    });
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('PersonalInformation', graduated);
  intentMap.set('AcademicData', academic);
  intentMap.set('FirstJob', firstOffer);
  intentMap.set('CurrentJob', currently);
  intentMap.set('InformationCompanyWork', informationCompany);
  intentMap.set('TypeCompanyWork', typeCompany);
  intentMap.set('InformationYourBusiness', InformationBusiness);
  intentMap.set('EmploymentHistory', employment);
  intentMap.set('RelationshipUniversity', relationship);

  agent.handleRequest(intentMap);
});