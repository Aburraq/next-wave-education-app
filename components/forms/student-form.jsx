'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import studentFields from '@/data/form-fields/student-fields.json';
import genderOptions from '@/data/options/gender-options.json';
import { SubmitButton } from '@/components/common/submit-button';
import styles from '@/styles/form.module.scss';
import { createStudentFormAction } from '@/actions/student/create-student-form.action';

export const StudentForm = ({ data }) => {
    const [state, action, pending] = useActionState(createStudentFormAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* =========== GENDER =========== */}
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
                {/* =========== ADVISOR TEACHER =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="advisorTeacherId" className={styles.label}>
                        Advisor Teacher
                    </label>
                    <select
                        className={styles.select}
                        name="advisorTeacherId"
                        id="advisorTeacherId"
                    >
                        <option value="">Select Advisor Teacher</option>
                        {data &&
                            data.map((item, index) => (
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
                text="Create Student"
                loadingText="Creating"
            />
        </form>
    );
};