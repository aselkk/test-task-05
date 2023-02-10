import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkboxes } from './Checkboxes';
import { getDatabase, ref, set } from "firebase/database";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  term: Yup.bool().oneOf([true], 'Field must be checked'),
  sectors: Yup.array()
  .min(1, "You can't leave this blank.")
  .required("You can't leave this blank.")
  .nullable()
});

export const FormView = ({userData} : {userData:any}) => {
  const [checked, setChecked] = useState<any>();
  const [name, setName] = useState<any>();
  const [term, setTerm] = useState<any>(false);
  
  console.log(checked, 'checked')
  console.log(userData?.sectors, 'arr')

  useEffect(() => {
    setChecked(userData?.sectors || []);
    setName(userData?.name);
    setTerm(userData?.term || '');
  }, [userData?.name, userData?.term]);

  return (
    <Formik
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={userData && {
        name: name,
        term: term,
        sectors: []
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values)
        const db = getDatabase();
        set(ref(db, 'userData/'), {
          values
        });
      }}
    >
      {({values, isSubmitting}) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label> 
            <Field type="text" name="name"  />
            <ErrorMessage name="name" />
          </div>
          <Checkboxes values={values} checked={checked} setChecked={setChecked} />
          <ErrorMessage name="sectors" />
          <div>
            <Field 
              type="checkbox" 
              name="term"
            />
            <label htmlFor="term">I agree to the terms and conditions</label>
            <ErrorMessage name="term" />
          </div>
          
          <button type="submit" disabled={isSubmitting} >
            Submit
          </button>
          { userData && 
          <div>
            <p>{userData.name}</p>
            <p>{userData.term ? 'true' : 'false'}</p>
            <div>{userData.sectors.map((s:any, i:number) => <p key={i}>{s}</p>)}</div>
          </div>
          }
        </Form>
      )}   
    </Formik>
  )
}  