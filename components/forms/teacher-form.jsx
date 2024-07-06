'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import teacherField from '@/data/form-fields/teacher-fields.json';
import genderOptions from '@/data/options/gender-options.json';
import { SubmitButton } from '@/components/common/submit-button';
import { MultiSelect } from '@/components/common/multi-select';
import { createTeacherFormAction } from '@/actions/teacher/create-teacher-form.action';
import styles from '@/styles/form.module.scss';

export const TeacherForm = ({ data }) => {
    const [state, action, pending] = useActionState(createTeacherFormAction);

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
                {/* =========== LESSON PROGRAMS MULTIPLE SELECTION =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonsIdList" className={styles.label}>
                        Lesson Programs
                    </label>
                    <MultiSelect
                        data={data}
                        name="lessonsIdList"
                        title="Lessons"
                    />
                    {state?.errors?.lessonsIdList && (
                        <AlertText
                            type="error"
                            text={state?.errors?.lessonsIdList}
                        />
                    )}
                </div>
                {teacherField.map((field, index) => {
                    const isLastItem = index === teacherField.length - 1;

                    const style = {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    };

                    return (
                        <div
                            key={index}
                            className={styles.inputGroup}
                            style={isLastItem ? style : {}}
                        >
                            <label
                                htmlFor={field.name}
                                className={styles.label}
                            >
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
                    );
                })}
                {state?.errors?.common && (
                    <AlertText type="error" text={state?.errors?.common} />
                )}
            </div>
            <SubmitButton
                pending={pending}
                text="Create Teacher"
                loadingText="Creating"
            />
        </form>
    );
};