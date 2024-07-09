'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import lessonFields from '@/data/form-fields/lesson-fields.json';
import { SubmitButton } from '@/components/common/submit-button';
import { createLessonFormAction } from '@/actions/lesson/create-lesson-form.action';
import styles from '@/styles/form.module.scss';

export const LessonForm = () => {
    const [state, action, pending] = useActionState(createLessonFormAction);

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {lessonFields.map((field, index) => {
                    const isLastItem = index === 0;

                    const style = {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginBottom: '24px',
                        gap: '24px'
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
                text="Create Lesson"
                loadingText="Creating"
            />
        </form>
    );
};