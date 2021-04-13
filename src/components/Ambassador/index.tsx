import React, { useState, useEffect } from 'react';
import UserForm from '../../components/UserForm/UserForm';
import { loadDataService } from '../../services/loadDataService';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import * as QueryString from 'query-string';
import { IFormValue } from '../../interfaces/formValue.interface';

export enum QueryParamKeys {
  UUID = 'uuid',
  EMAIL = 'email',
}

const Ambassador: React.FunctionComponent<RouteComponentProps> = (
  props: any
) => {
  const {
    skills,
    experiences,
    qualifications,
    certificates,
    inductions,
    referrerTypes,
  } = props;
  const [ambassadorInfo, setAmbassadorInfo] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedExperiences, setExperiences] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedInductions, setSelectedInductions] = useState([]);
  const params = QueryString.parse(props.location.search);
  const uuid = params.uuid;
  const email = params[QueryParamKeys.EMAIL];

  const responseToArray = (responseObj: any, prefix: string) => {
    let returnArr: IFormValue[] = [];
    for (const prop of responseObj) {
      returnArr.push({ id: prefix + prop.id, label: prop });
    }
    return returnArr;
  };

  useEffect(() => {
    loadDataService
      .loadAmbassador(uuid, email)
      .then((response: any) => {
        const {
          skills,
          experience,
          qualifications,
          inductions,
          certificates,
        } = response.talentApplication;
        // setSelectedSkills to be passes as props
        if (skills && skills.length > 0) {
          setSelectedSkills(responseToArray(skills, 'skills'));
        }
        // setExperience to be passes as props
        if (experience && experience.length > 0) {
          setExperiences(responseToArray(experience, 'experience'));
        }
        // setSelectedQualifications to be passes as props
        if (qualifications && qualifications.length > 0) {
          setSelectedQualifications(
            responseToArray(qualifications, 'qualification')
          );
        }
        // setSelectedCertificates to be passes as props
        if (certificates && certificates.length > 0) {
          setSelectedCertificates(responseToArray(certificates, 'certificate'));
        }
        // setSelectedCertificates to be passes as props
        if (inductions && inductions.length > 0) {
          setSelectedInductions(responseToArray(inductions, 'induction'));
        }
        setAmbassadorInfo(response.talentApplication);
      })
      .catch(function (error) {
        console.log('error=', error);
        props.history.push('/error_404');
      });
  }, []);

  return (
    ambassadorInfo && (
      <UserForm
        skills={skills}
        selectedSkills={selectedSkills}
        experiences={experiences}
        selectedExperiences={selectedExperiences}
        qualifications={qualifications}
        selectedQualifications={selectedQualifications}
        certificates={certificates}
        selectedCertificates={selectedCertificates}
        inductions={inductions}
        selectedInductions={selectedInductions}
        referrerTypes={referrerTypes}
        ambassadorInfo={ambassadorInfo}
      />
    )
  );
};

export default withRouter(Ambassador);
