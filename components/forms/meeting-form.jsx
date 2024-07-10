'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import meetingFields from '@/data/form-fields/meeting-fields.json';
import { SubmitButton } from '@/components/common/submit-button';
import { createMeetingFormAction } from '@/actions/meeting/create-meeting-form.action';
import { MultiSelect } from '@/components/common/multi-select';
import { extractStudentInformation } from '@/utils/functions/extract-student-information';
import styles from '@/styles/form.module.scss';

export const MeetingForm = ({ data }) => {
    const [state, action, pending] = useActionState(createMeetingFormAction);


    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {data?.status === 'error' && (
                    <AlertText type="error" text={data?.message} />
                )}
                {/* STUDENT */}
                <div className={styles.inputGroup}>
                    <label htmlFor="studentIds" className={styles.label}>
                        Students
                    </label>
                    <MultiSelect
                        data={extractStudentInformation(data)}
                        name="studentIds"
                        title="Students"
                    />
                    {state?.errors?.studentIds && (
                        <AlertText
                            type="error"
                            text={state?.errors?.studentIds}
                        />
                    )}
                </div>
                {meetingFields.map((field, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <label htmlFor={field.name} className={styles.label}>
                            {field.label}
                        </label>
                        {field.type !== 'textarea' ? (
                            <input
                                type={field.type}
                                autoComplete={field.autoComplete}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                className={styles.input}
                            />
                        ) : (
                            <textarea
                                autoComplete={field.autoComplete}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                className={`${styles.input} ${styles.textarea}`}
                            ></textarea>
                        )}
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
                text="Create Meeting"
                loadingText="Creating"
            />
        </form>
    );
};