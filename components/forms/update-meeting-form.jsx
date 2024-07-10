'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import { SubmitButton } from '@/components/common/submit-button';
import { MultiSelect } from '@/components/common/multi-select';
import { updateMeetingFormAction } from '@/actions/meeting/update-meeting-form.action';
import { extractStudentInformation } from '@/utils/functions/extract-student-information';
import meetingFields from '@/data/form-fields/meeting-fields.json';
import styles from '@/styles/form.module.scss';

export const UpdateMeetingForm = ({ data, slug, studentsData }) => {
    const [state, action, pending] = useActionState(updateMeetingFormAction);

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
                    {studentsData?.status === 'error' ? (
                        <p className={styles.customMessage}>
                            There are no students assigned to this teacher
                        </p>
                    ) : (
                        <MultiSelect
                            data={extractStudentInformation(studentsData)}
                            name="studentIds"
                            title="Students"
                            defaultValues={extractStudentInformation(
                                data?.object?.students
                            )}
                        />
                    )}
                    {state?.errors?.studentIds && (
                        <AlertText
                            type="error"
                            text={state?.errors?.studentIds}
                        />
                    )}
                </div>
                {/* send user id to the server action to update the user with that id */}
                <input type="hidden" name="id" value={slug} />
                {meetingFields.map((field, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <label htmlFor={field.name} className={styles.label}>
                            {field.label}
                        </label>
                        {field.type !== 'textarea' ? (
                            <input
                                autoComplete={field.autoComplete}
                                className={styles.input}
                                defaultValue={data?.object[field.name]}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                type={field.type}
                            />
                        ) : (
                            <textarea
                                autoComplete={field.autoComplete}
                                className={`${styles.input} ${styles.textarea}`}
                                defaultValue={data?.object[field.name]}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
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
                text="Update Meeting"
                loadingText="Updating"
            />
        </form>
    );
};