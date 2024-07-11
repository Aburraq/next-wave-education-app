'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import teacherField from '@/data/form-fields/teacher-fields.json';
import genderOptions from '@/data/options/gender-options.json';
import { SubmitButton } from '@/components/common/submit-button';
import { MultiSelect } from '@/components/common/multi-select';
import { extractSelectedLessonPrograms } from '@/utils/functions/extract-selected-lesson-programs';
import { updateTeacherFormAction } from '@/actions/teacher/update-teacher-form.action';
import styles from '@/styles/form.module.scss';

export const UpdateTeacherForm = ({ data, lessonProgramsData, slug }) => {
    const [state, action, pending] = useActionState(updateTeacherFormAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* =========== GENDER =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="gender" className={styles.label}>
                        Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        className={styles.select}
                        defaultValue={data?.object?.gender}
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
                {/* =========== LESSON PROGRAMS MULTIPLE SELECTION =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonsIdList" className={styles.label}>
                        Lesson Programs
                    </label>
                    <MultiSelect
                        data={lessonProgramsData}
                        defaultValues={extractSelectedLessonPrograms(
                            data?.object?.lessonsProgramList
                        )}
                        name="lessonsIdList"
                        title="Lesson Programs"
                    />
                    {state?.errors?.lessonsIdList && (
                        <AlertText
                            type="error"
                            text={state?.errors?.lessonsIdList}
                        />
                    )}
                </div>
                {/* send user id to the server action to update the user with that id */}
                <input type="hidden" name="id" value={slug} />
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
                                {...(field.type === 'checkbox'
                                    ? {
                                          defaultChecked:
                                              data?.object?.isAdvisor
                                      }
                                    : {
                                          defaultValue:
                                              data?.object?.[field.name]
                                      })}
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
                text="Update Teacher"
                loadingText="Updating"
            />
        </form>
    );
};
