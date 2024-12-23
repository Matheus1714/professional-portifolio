import { actions } from '@/actions/index';
import { useEffect, useState } from 'react';

export function Version() {
    const [version, useVersion] = useState('');
    useEffect(() => {
        actions.getLatestVersion().then((r) => useVersion(r.version));
    }, []);

    return <>{version}</>
}