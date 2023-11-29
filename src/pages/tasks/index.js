import { getDataApi } from '@/utils/api';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Index() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // panggil api get-tasks kemudian simpan di setList
    const run = async () => {
      await getDataApi(
        '/api/admin/get-tasks',
        (dataSuccess) => {
          console.log('dataSuccess: ', dataSuccess);
          setList(dataSuccess);
        },
        (dataFail) => {
          console.log('dataFail: ', dataFail);
        }
      );
    };

    run();
  }, []);

  return (
    <div>
      {' '}
      <h1>List Task</h1>
      {list &&
        list.length > 0 &&
        list.map((myList, index) => {
          return (
            <div key={index} style={{ padding: '8px' }}>
              {myList.link}{' '}
              <div>
                <Link
                  href={`/tasks/detail/${myList._id}`}
                  style={{ margin: '4px' }}
                >
                  Detail
                </Link>
                <Link
                  href={`/tasks/edit?id=${myList._id}`}
                  style={{ margin: '4px' }}
                >
                  Edit
                </Link>
                <Link href={`/tasks/create`} style={{ margin: '4px' }}>
                  Buat
                </Link>
                <button
                  style={{ margin: '4px' }}
                  onClick={() => {
                    alert(`hapus ${myList._id}`);
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      {!list || (list.length == 0 && <div>Tidak da Data</div>)}
    </div>
  );
}
