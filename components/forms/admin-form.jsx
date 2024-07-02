'use client';

import { createAdminFormAction } from '@/actions/admin/create-admin-form.action';
import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import adminFields from '@/data/form-fields/admin-fields.json';
import genderOptions from '@/data/options/gender-options.json';
import { SubmitButton } from '@/components/common/submit-button';
import { createAssistantManagerFormAction } from '@/actions/assistant-manager/create-assistant-manager-form.action';
import styles from '@/styles/form.module.scss';

export const AdminForm = ({ buttonTitle = 'Admin', type = 'admin' }) => {
    let formAction =
        type === 'admin'
            ? createAdminFormAction
            : createAssistantManagerFormAction;

    const [state, action, pending] = useActionState(formAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* GENDER */}
                <div className={styles.inputGroup}>
                    <label htmlFor="gender" className={styles.label}>
                        Gender
                    </label>
                    <select name="gender" id="gender" className={styles.select}>
                        {genderOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors?.gender && (
                        <AlertText type="error" text={state?.errors?.gender} />
                    )}
                </div>
                {adminFields.map((field, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <label htmlFor={field.name} className={styles.label}>
                            {field.label}
                        </label>
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
                                type="error"
                                text={state?.errors?.[field.name][0]}
                            />
                        )}
                    </div>
                ))}
                {state?.errors?.common && (
                    <AlertText type="error" text={state?.errors?.common} />
                )}
            </div>
            <SubmitButton
                pending={pending}
                text={`Create ${buttonTitle}`}
                loadingText="Creating"
            />
        </form>
    );
};