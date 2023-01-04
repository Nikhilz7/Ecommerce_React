import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

// import { 
//     // createAuthUserWithEmailAndPassword, 
//     signInAuthUserWithEmailAndPassword, 
// } from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultformFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormField] = useState(defaultformFields);
    const { email, password } = formFields;

    const SignInWithGoodle = async () =>{
        dispatch(googleSignInStart());
    }

    const resertFormFields = () => {
        setFormField(defaultformFields);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            dispatch(emailSignInStart(email,password));
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
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button childern="Sign In" type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} children="Google Sign In" onClick={SignInWithGoodle}/>
                </ButtonsContainer>
            </form>
        </SignInContainer>

    );
};
export default SignInForm;