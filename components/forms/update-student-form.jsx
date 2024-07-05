'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import genderOptions from '@/data/options/gender-options.json';
import { SubmitButton } from '@/components/common/submit-button';
import studentFields from '@/data/form-fields/student-fields.json';
import { updateStudentFormAction } from '@/actions/student/update-student-form.action';
import styles from '@/styles/form.module.scss';

export const UpdateStudentForm = ({ advisorTeacherData, data, slug }) => {
    const [state, action, pending] = useActionState(updateStudentFormAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* =========== GENDER =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="gender" className={styles.label}>
                        Gender
                    </label>
                    <select
                        className={styles.select}
                        defaultValue={data?.gender}
                        id="gender"
                        name="gender"
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
                {/* =========== ADVISOR TEACHER =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="advisorTeacherId" className={styles.label}>
                        Advisor Teacher
                    </label>
                    <select
                        className={styles.select}
                        defaultValue={data?.advisorTeacherId}
                        name="advisorTeacherId"
                        id="advisorTeacherId"
                    >
                        <option value="">Select Advisor Teacher</option>
                        {advisorTeacherData &&
                            advisorTeacherData.map((item, index) => (
                                <option
                                    key={index}
                                    value={item?.advisorTeacherId}
                                >
                                    {item?.teacherName} {item?.teacherSurname}
                                </option>
                            ))}
                    </select>
                    {state?.errors?.advisorTeacherId && (
                        <AlertText
                            type="error"
                            text={state?.errors?.advisorTeacherId}
                        />
                    )}
                </div>
                {/* send user id to the server action to update the user with that id */}
                <input type="hidden" name="id" value={slug} />
                {studentFields.map((field, index) => (
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
                            defaultValue={data?.[field.name]}
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
                text="Update Student"
                loadingText="Updating"
            />
        </form>
    );
};