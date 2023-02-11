import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkboxes } from './Checkboxes';
import { getDatabase, ref, set } from "firebase/database";
import { UserDataProps } from '../types';
import '../styles/inputs.scss'
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please, enter your name'),
  term: Yup.bool().oneOf([true], 'Please, accept the terms'),
  sectors: Yup.array()
  .min(1, "Please, pick at least one sector")
  .required("Please, pick at least one sector")
  .nullable()
});

export const Inputs = ({userData, getUserData} : UserDataProps) => {
  const [checked, setChecked] = useState<string[] | undefined>([]);
  const [name, setName] = useState<string>();
  const [term, setTerm] = useState<boolean>(false);
  const [bttnTxt, setBttnTxt] = useState<string>('save')

  useEffect(() => {
    setChecked(userData?.sectors || []);
    setName(userData?.name || '');
    setTerm(userData?.term || false);
  }, [userData]);

  return (
    <Formik
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name,
        term,
        sectors: checked
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const db = getDatabase();
        set(ref(db, 'userData/'), {
          values
        });
        setBttnTxt('saved')
        setTimeout(() => {
          setBttnTxt('save')
          setSubmitting(false);
          getUserData()
        }, 2000)
      }}
    >
      {({values, isSubmitting}) => (
        <div className="container">
          <div className='wrapper'>
            <h4 className='header'>Please enter your name and pick the sectors you are currently involved in.</h4>
            <Form className='form'>
              <div className='inputs checkboxes'>
                <p>Sectors:</p>
                <div className='checkboxes-wrapper'>
                  <Checkboxes values={values} checked={checked} setChecked={setChecked} />
                </div>
              </div>
              <span className='err-msg error-sectors'>
                <ErrorMessage name="sectors" />
              </span>
              <div className='name inputs'>
                <label htmlFor="name">Name:</label> 
                <Field type="text" name="name" />
              </div>
              <span className='err-msg error-name'>
                <ErrorMessage name="name" />
              </span>
              <div className='inputs terms'>
                <Field type="checkbox" name="term" id='term' />
                <label htmlFor="term">I agree to the terms and conditions</label>
              </div>
              <span className='err-msg error-term'>
                <ErrorMessage name="term" />
              </span>
              <button 
                className='button' 
                type="submit" 
                disabled={isSubmitting}
                style={{ backgroundColor: isSubmitting ? 'gray' : ''}}
              >
                {bttnTxt}
              </button>
              <p className='link'><Link to='/'>Go to main</Link></p>
            </Form>
          </div>
        </div>
      )}   
    </Formik>
  )
}  