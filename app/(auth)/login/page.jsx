'use client';
import { loginFormAction } from '@/actions/auth/login-form.action';
import { AlertText } from '@/components/common/alert-text';
import { SubmitButton } from '@/components/common/submit-button';
import { loginFields } from '@/data/form-fields/login-fields';
import styles from '@/styles/pages/login-page.module.scss';
import { useActionState } from 'react';

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(loginFormAction);

    return (
        <form className={styles.form} action={formAction}>
            {loginFields.map((field, index) => (
                <div key={index} className={styles.inputGroup}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type}
                        autoComplete={field.autoComplete}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className={styles.input}
                    />
                    {state?.errors?.[field.name] && (
                        <AlertText
                            text={state?.errors?.[field.name]}
                            type="error"
                        />
                    )}
                </div>
            ))}

            {state?.errors?.common && (
                <AlertText type="error" text={state?.errors?.common} />
            )}
            <SubmitButton
                pending={pending}
                text="Sign In"
                loadingText="Signing In"
            />
        </form>
    );
}
