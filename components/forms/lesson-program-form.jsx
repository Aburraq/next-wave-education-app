'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import educationTermFields from '@/data/form-fields/education-term-fields.json';
import { SubmitButton } from '@/components/common/submit-button';
import { createEducationTermAction } from '@/actions/education-term/create-education-term-form.action';
import { colorfulLog } from '@halibal/colorful-log';
import styles from '@/styles/form.module.scss';
import { extractEducationTerms } from '@/utils/functions/extract-education-terms';

export const LessonProgramForm = ({ educationTermsData, lessonsData }) => {
    const [state, action, pending] = useActionState(createEducationTermAction);

    // console.log('lessonsData', lessonsData);
    colorfulLog('red', ['educationTermsData', educationTermsData]);

    colorfulLog('yellow', ['lessonsData', lessonsData]);

    const isEducationTermsData = educationTermsData?.status !== 'error';

    let termOptions = [];

    if (isEducationTermsData) {
        termOptions = extractEducationTerms(educationTermsData);
    }

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* LESSONS MULTIPLE SELECTION */}
                {/* EDUCATION TERMS */}
                <div className={styles.inputGroup}>
                    <label htmlFor="educationTermId" className={styles.label}>
                        Education Term
                    </label>
                    <select
                        name="educationTermId"
                        id="educationTermId"
                        className={styles.select}
                    >
                        {termOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors?.term && (
                        <AlertText type="error" text={state?.errors?.term} />
                    )}
                </div>
                {educationTermFields.map((field, index) => (
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
                text="Create Lesson Program"
                loadingText="Creating"
            />
        </form>
    );
};