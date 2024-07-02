'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import adminFields from '@/data/form-fields/admin-fields.json';
import genderOptions from '@/data/options/gender-options.json';
import { SubmitButton } from '@/components/common/submit-button';
import { updateAssistantManagerFormAction } from '@/actions/assistant-manager/update-assistant-manager-form.action';
import { updateManagerFormAction } from '@/actions/manager/update-manager-form.action';
import styles from '@/styles/form.module.scss';

export const UpdateManagerForm = ({
    data,
    slug,
    type = 'manager'
}) => {
    const formAction =
        type === 'manager'
            ? updateManagerFormAction
            : updateAssistantManagerFormAction;

    const [state, action, pending] = useActionState(formAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* GENDER */}
                <div className={styles.inputGroup}>
                    <label htmlFor="gender" className={styles.label}>
                        Gender
                    </label>
                    <select
                        defaultValue={data?.object?.gender}
                        name="gender"
                        id="gender"
                        className={styles.select}
                    >
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
                {/* send user id to the server action to update the user with that id */}
                <input type="hidden" name="userId" value={slug} />
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
                            defaultValue={data?.object?.[field.name]}
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
                text="Update Assistant Manager"
                loadingText="Updating"
            />
        </form>
    );
};