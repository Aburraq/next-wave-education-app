'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import { SubmitButton } from '@/components/common/submit-button';
import { MultiSelect } from '@/components/common/multi-select';
import { updateMeetingFormAction } from '@/actions/meeting/update-meeting-form.action';
import { extractStudentInformation } from '@/utils/functions/extract-student-information';
import meetingFields from '@/data/form-fields/meeting-fields.json';
import styles from '@/styles/form.module.scss';
import { extractEducationTerms } from '@/utils/functions/extract-education-terms';
import { extractLessons } from '@/utils/functions/extract-lessons';

export const UpdateStudentInformationForm = ({
    educationTermsData,
    lessonsData,
    studentsData
}) => {
    const [state, action, pending] = useActionState(updateMeetingFormAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {state?.status === 'error' && (
                    <AlertText type="error" text={state?.message} />
                )}
                {data?.status === 'error' && (
                    <AlertText type="error" text={data?.message} />
                )}
                {/* ========== STUDENT ========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="studentId" className={styles.label}>
                        Students
                    </label>
                    {studentsData?.status === 'error' ? (
                        <p className={styles.customMessage}>
                            There are no students assigned to this teacher
                        </p>
                    ) : (
                        <select
                            name="studentId"
                            id="studentId"
                            className={styles.input}
                        >
                            <option value="">Select a student...</option>
                            {extractStudentInformation(studentsData).map(
                                (item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            )}
                        </select>
                    )}
                    {state?.errors?.studentId && (
                        <AlertText
                            type="error"
                            text={state?.errors?.studentId}
                        />
                    )}
                </div>
                {/* ========== EDUCATION TERM ========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="educationTermId" className={styles.label}>
                        Education Term
                    </label>
                    {studentsData?.status === 'error' ? (
                        <p className={styles.customMessage}>
                            There are education terms available
                        </p>
                    ) : (
                        <select
                            name="educationTermId"
                            id="educationTermId"
                            className={styles.input}
                        >
                            <option value="">Select a student...</option>
                            {extractEducationTerms(educationTermsData).map(
                                (item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            )}
                        </select>
                    )}
                    {state?.errors?.educationTermId && (
                        <AlertText
                            type="error"
                            text={state?.errors?.educationTermId}
                        />
                    )}
                </div>
                {/* ========== LESSONS ========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonId" className={styles.label}>
                        Lessons
                    </label>
                    {studentsData?.status === 'error' ? (
                        <p className={styles.customMessage}>
                            There are education terms available
                        </p>
                    ) : (
                        <select
                            name="lessonId"
                            id="lessonId"
                            className={styles.input}
                        >
                            <option value="">Select a lesson...</option>
                            {extractLessons(lessonsData).map(
                                (item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            )}
                        </select>
                    )}
                    {state?.errors?.lessonId && (
                        <AlertText
                            type="error"
                            text={state?.errors?.lessonId}
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