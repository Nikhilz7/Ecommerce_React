import { useState  } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    // createAuthUserWithEmailAndPassword, 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultformFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormField] = useState(defaultformFields);
    const { email, password } = formFields;


    const SignInWithGoodle = async () =>{
        await signInWithGooglePopup();
        
    }

    const resertFormFields = () => {
        setFormField(defaultformFields);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            resertFormFields();
        }catch(err){
            switch(err.code){
                case 'auth/wrong-password': 
                    alert("Incorrect password. Please try again.");
                    break;
                case 'auth/user-not-found':
                    alert("User not found for this email.");    
                    break;
                default:
                    console.log(err);
            }
            
        }
    }

    const handleChange = (event) => {
        const { name,value } = event.target;
        setFormField({...formFields, [name]: value})
    };

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label="Email"
                    type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                    required
                />
                
                <FormInput 
                    label="Password" 
                    type='password' 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required
                />
                <div className='buttons-container'>
                    <Button childern="Sign In" type='submit'>Sign In</Button>
                    <Button type="button" buttonType='google' childern="Google Sign In" onClick={SignInWithGoodle}>gSign In</Button>
                </div>
            </form>
        </div>

    );
};
export default SignInForm;