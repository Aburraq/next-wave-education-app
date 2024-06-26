import { Loader } from '@/components/common/loader';
import { ThreeDots } from '@/components/common/three-dots';
import styles from '@/styles/components/common/submit-button.module.scss';

export const SubmitButton = ({ pending, text, loadingText }) => {
    return (
        <button
            type="submit"
            className={styles.button}
            title={pending ? loadingText : text}
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader />
                    <span className={styles.submitting}>
                        {loadingText}
                        <ThreeDots />
                    </span>
                </>
            ) : (
                text
            )}
        </button>
    );
};
