import React from 'react';
// import CustomTypes from '../../lib/custom-types';
// import PropTypes from 'prop-types';
import {
    Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';

const CPagination = ({ model: { CurrentPage, TotalPages, HasNext, HasPrevious }, setPage }) => {

    const getPagesLink = () => {
        let linkList = []
        for (let index = 0; index < TotalPages; index++) {
            linkList[index] = index + 1;
        }

        const prev = (CurrentPage === 1 || CurrentPage === 2) ? '1' : CurrentPage - 1;
        const next = (CurrentPage === 1 || CurrentPage === 2) ? '3' : CurrentPage + 1;
        
        var resultado = linkList.filter(item => prev === item || CurrentPage === item || next === item);

        console.log('prev', prev);
        console.log('nex', next);
        console.log('resultado', resultado);

        return linkList.map(pag =>
            <PaginationItem key={'pik' + pag} className={(CurrentPage === pag ? "active" : "")}>
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
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
            >
                <PaginationItem className={(!HasPrevious ? "disabled" : "")}>
                    <PaginationLink
                        onClick={e => { e.preventDefault(); setPage(CurrentPage - 1) }}
                        tabIndex="-1"
                    >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                    </PaginationLink>
                </PaginationItem>
                {"..."}
                {
                    getPagesLink()
                }
                {"..."}
                <PaginationItem className={(!HasNext ? "disabled" : "")}>
                    <PaginationLink
                        onClick={e => { e.preventDefault(); setPage(CurrentPage + 1) }}
                    >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </>
    );
};

// Pagination.propTypes = {
//     user: CustomTypes.userData,
//     allowedRoles: PropTypes.string,
// };

export default CPagination;