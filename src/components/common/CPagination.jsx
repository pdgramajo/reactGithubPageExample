import React from 'react';
import {
    Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';

const CPagination = ({ model: { CurrentPage, TotalPages, HasNext, HasPrevious }, setPage }) => {

    const getPagesLink = () => {
        let linkList = []
        for (let index = 0; index < TotalPages; index++) {
            linkList[index] = index + 1;
        }

        return linkList.map(pag =>
            <PaginationItem key={'pik' + pag} className={(CurrentPage === pag ? 'active' : '')}>
                <PaginationLink
                    onClick={e => { e.preventDefault(); setPage(pag) }}
                >
                    {pag}
                </PaginationLink>
            </PaginationItem>
        )
    }

    return (
        <>
            <Pagination
                className='pagination justify-content-end mb-0'
                listClassName='justify-content-end mb-0'
            >
                <PaginationItem className={(!HasPrevious ? 'disabled' : '')}>
                    <PaginationLink
                        onClick={e => { e.preventDefault(); setPage(CurrentPage - 1) }}
                        tabIndex='-1'
                    >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                    </PaginationLink>
                </PaginationItem>
                {
                    getPagesLink()
                }
                <PaginationItem className={(!HasNext ? 'disabled' : '')}>
                    <PaginationLink
                        onClick={e => { e.preventDefault(); setPage(CurrentPage + 1) }}
                    >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </>
    );
};

export default CPagination;