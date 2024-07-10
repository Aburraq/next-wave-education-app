'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import { SubmitButton } from '@/components/common/submit-button';
import { extractStudentInformation } from '@/utils/functions/extract-student-information';
import studentInformationFields from '@/data/form-fields/student-information-fields.json';
import { extractEducationTerms } from '@/utils/functions/extract-education-terms';
import { extractLessons } from '@/utils/functions/extract-lessons';
import { updateStudentInformationFormAction } from '@/actions/student-information/update-student-information-form.action';
import styles from '@/styles/form.module.scss';

export const UpdateStudentInformationForm = ({
    data,
    educationTermsData,
    lessonsData,
    slug,
    studentsData
}) => {
    const [state, action, pending] = useActionState(
        updateStudentInformationFormAction
    );

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {state?.status === 'error' && (
                    <AlertText type="error" text={state?.message} />
                )}
                {educationTermsData?.status === 'error' && (
                    <AlertText
                        type="error"
                        text={educationTermsData?.message}
                    />
                )}
                {lessonsData?.status === 'error' && (
                    <AlertText type="error" text={lessonsData?.message} />
                )}
                {studentsData?.status === 'error' && (
                    <AlertText type="error" text={studentsData?.message} />
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
                            defaultValue={data?.studentResponse?.userId}
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
                            defaultValue={data?.educationTermId}
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
                            defaultValue={data?.lessonId}
                            name="lessonId"
                            id="lessonId"
                            className={styles.input}
                        >
                            <option value="">Select a lesson...</option>
                            {extractLessons(lessonsData).map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
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
                {/* ========== FIELDS ========== */}
                {studentInformationFields.map((field, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <label htmlFor={field.name} className={styles.label}>
                            {field.label}
                        </label>
                        {field.type !== 'textarea' ? (
                            <input
                                autoComplete={field.autoComplete}
                                className={styles.input}
                                defaultValue={data?.[field.name]}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                type={field.type}
                            />
                        ) : (
                            <textarea
                                autoComplete={field.autoComplete}
                                className={`${styles.input} ${styles.textarea}`}
                                defaultValue={data?.[field.name]}
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
                text="Update Student Information"
                loadingText="Updating"
            />
        </form>
    );
};