-- Insert example data
INSERT INTO college (id, name)
VALUES (1, 'Engineering'),
       (2, 'Science'),
       (3, 'Business'),
       (4, 'Natural Resources and Environment'),
       (5, 'Architecture, Arts, and Design'),
       (6, 'Liberal Arts and Human Sciences'),
       (7, 'Agriculture and Life Sciences');

INSERT into major (name, college_id)
VALUES ('Aerospace Engineering', 1),
       ('Biological Systems Engineering', 1),
       ('Biomedical Engineering', 1),
       ('Building Construction', 1),
       ('Chemical Engineering', 1),
       ('Civil Engineering', 1),
       ('Computer Engineering', 1),
       ('Computer Science', 1),
       ('Construction Engineering and Management', 1),
       ('Electrical Engineering', 1),
       ('Industrial and Systems Engineering', 1),
       ('Materials Science and Engineering', 1),
       ('Mechanical Engineering', 1),
       ('Mining Engineering', 1),
       ('Ocean Engineering', 1),
       ('Biology', 2),
       ('Chemistry', 2),
       ('Nueroscience', 2),
       ('Computational Modeling and Data Analytics', 2),
       ('Economics', 2),
       ('Geosciences', 2),
       ('Mathematics', 2),
       ('Nanomedicine or Nanoscience', 2),
       ('Physics', 2),
       ('Psychology', 2),
       ('Accounting and Information Systems', 3),
       ('Business Information Technology', 3),
       ('Cybersecurity Mangagement and Analytics', 3),
       ('Entrepreneurship, Innovation and Technology', 3),
       ('Finance', 3),
       ('Management', 3),
       ('Human Resource Management', 3),
       ('Real Estate', 3),
       ('Environment Conservation and Society', 4),
       ('Environmental Data Science', 4),
       ('Environemnt Resources Management', 4),
       ('Fish Conservation', 4),
       ('Forestry', 4),
       ('Geography', 4),
       ('Meteorology', 4),
       ('Packing Systems and Design', 4),
       ('Sustainable Biomaterials', 4),
       ('Water: Resources, Policy, and Management', 4),
       ('Wildlife Conservation', 4),
       ('Architecture', 5),
       ('Art', 5),
       ('Cinema', 5),
       ('Creative Technologies', 5),
       ('Design', 5),
       ('Music', 5),
       ('Advertising', 6),
       ('Arts', 6),
       ('Classical Studies', 6),
       ('Communication', 6),
       ('Consumer Studies', 6),
       ('Creative Writing', 6),
       ('Criminology', 6),
       ('Design', 6),
       ('Education', 6),
       ('English', 6),
       ('Environmental Policy and Planning', 6),
       ('European and Transatlantic Studies', 6),
       ('Fashion Merchandising and Design', 6),
       ('History', 6),
       ('Human Development', 6),
       ('Humanities for Public Service', 6),
       ('International Studies', 6),
       ('Multimedia Journalism', 6),
       ('National Security and Foreign Affairs', 6),
       ('Language', 6),
       ('Philosophy', 6),
       ('Political Science', 6),
       ('Professional and Technical Writing', 6),
       ('Property Management', 6),
       ('Public Relations', 6),
       ('Religion and Culture', 6),
       ('Smart and Sustainable Cities', 6),
       ('Sociology', 6),
       ('Sports Media and Analytics', 6),
       ('Agribusiness', 7),
       ('Agricultural Sciences', 7),
       ('Animal and Poultry Sciences', 7),
       ('Biochemistry', 7),
       ('Community Economic/Leadership Development', 7),
       ('Crop and Soil Sciences', 7),
       ('Dairy Science', 7),
       ('Environmental Economics: Management and Policy', 7),
       ('Environmental Horticulture', 7),
       ('Enviromental Science', 7),
       ('Exercise & Health Sciences', 7),
       ('Food and Health Systems Economics', 7),
       ('Integrated Agriculture Technologies', 7),
       ('International Trade and Development', 7),
       ('Landscape Design and Turfgrass Science', 7),
       ('Nutrition and Dietetics', 7),
       ('Plant Science', 7);

INSERT INTO app_user (username, password, role, pending)
VALUES ('admin@gmail.com', '$2b$12$Jit86DCOg/.jCY6TTFNVlOvv4Pg4XjNYDxc3XHWd7J6pB3Qc3SQWi', 'ADMIN', false);

INSERT INTO lab (name, url, principle_investigator, description)
VALUES ('Complex Networks and Security Research', 'https://www.cnsr.ictas.vt.edu/', 'Tom Hou',
        'The mission of the CNSR@VT lab is to conduct basic and applied research in a broad range of topics in networking, wireless, and cyber security. We explore novel concepts and ideas related to protocols and systems of the future pervasive cyber infrastructure, and design scalable architecture and trustworthy protocols for next-generation networks.'),
       ('Advanced Materials and Technologies Laboratory', 'https://amtl.me.vt.edu/', 'Ranga Pitchumani',
        'Organized in thematic research clusters, the projects focus on energy conversion and storage, energy/water nexus, electric grid integration of renewable energy; bio-inspired materials design and advanced materials processing (polymer, composite, ceramic materials); micro and nanotechnologies; uncertainty quantification and large-scale optimization'),
       ('Vortical Flow and Diagnostics Lab', 'https://www.aoe.vt.edu/research/facilities/vfd-appl.html', 'Todd Lowe',
        ' Specializes in experimental fluid mechanics and the development of advanced diagnostics for propulsion and energy applications. Experimental rigs like the heated jet rig shown above support a wide range of industry- and government-sponsored research at the Advanced Propulsion and Power Laboratory.'),
       ('A3 Lab', 'https://www.bse.vt.edu/research/facilities/a3-lab.html', 'Feras Batarseh',
        'The research at A3 lab spans the areas of artificial intelligence (AI) and cyberbiosecurity for water systems and smart agriculture. The A3 team develops AI applications and assurance algorithms to address persisting water security and agricultural public policy challenges, such as: protecting water supply systems, optimizing smart-farming and precision agriculture, analyzing international ag trade, and understanding the economic effects of outlier events on biological systems (such as rivers and watersheds) using data-driven methods'),
       ('Batra Lab', 'http://www.sites.beam.vt.edu/batra/', 'Romesh C. Batra',
        'Multiscale Analysis of Multiphysics Problems involving material and Geometric Nonlinearities, Nanomechanics, Dynamic Failure under Shock Loads, Smart Structures, Functionally Graded Materials.'),
       ('Nanoscale Characterization and Fabrication Lab', 'https://www.ncfl.ictas.vt.edu/', 'Matthew Hull ',
        'The NCFL offers fee-for-service access to expert staff and advanced instruments supporting nano-enabled research and scholarship, training and workforce development, education and outreach, technology translation, and economic development.'),
       ('Applied Interdisciplinary Research on Flow Systems (AIRFlowS) Lab', 'https://www.airflows.cee.vt.edu/',
        'Hosein Foroutan',
        'In the AIRFlowS lab, we study a wide range of environmental, geophysical, and biological flow systems that are diverse in nature, scale, and physics. With a synergistic blend of numerical simulation, theory, experiment, and observation, we characterize momentum, energy, and pollutants in these systems. Our research is highly interdisciplinary and integrates the knowledge of environmental engineering, Earth and atmospheric science, fluid dynamics, computational science, and aerosol physics and chemistry.'),
       ('Dover Lab for Manufacturing Systems Integration', 'https://www.ise.vt.edu/research/labs/dover.html',
        'Kimberly P. Ellis',
        'The Dover Laboratory for Manufacturing Systems Integration supports research in the study and analysis of manufacturing systems. The areas of research include both operational issues (such as production planning, material handling, and distribution) and design issues (such as facility layout and supply chain system design). The lab emphasizes the integration of operational and design issues through the application of operations research techniques.'),
       ('NanoEarth', 'https://nanoearth.ictas.vt.edu/', 'Mitsuhiro Murayama',
        'NanoEarth is the leading destination for earth and environmental nanoscience discovery. We serve the scientists and engineers solving our greatest environmental challenges. NanoEarth supports researchers across academia, government, and industry to enable critical discoveries at the nanoscale. We provide the advanced tools and expertise to guide nanotechnology research and propel environmental solutions.'),
       ('Laboratory of Subsurface Energy, Water, and Environmental Systems',
        'https://sites.google.com/view/chen-lab/home', 'Cheng Chen',
        'Development of full understanding of mechanical-chemical coupling in bentonite THMC processes using experimental and deep learning methods'),
       ('Aylward Lab', 'https://www.aylwardlab.com/', 'Frank Aylward',
        'Aylward lab is broadly interested in the ecology and evolution of viruses. Hallmark discoveries made over the last ~40 years have underscored the importance of microbes to the planet and shown that global biogeochemical cycles are driven by diverse groups of bacteria, archaea, protists, and their viruses, most of which lack any cultivated representatives. Novel viral lineages continue to be discovered using cultivation-independent methods, and currently a major challenge is understanding the ecology and evolution of these groups, what governs their host range and infection dynamics, and their broader impact on the biosphere. We use a combination of computational and experimental approaches to investigate the phylogenetic, genomic, and metabolic diversity of various viral groups.'),
       ('Gentry Lab', 'https://gentry-lab.com', 'Emily Gentry',
        'Discover new biological molecules and mechanisms, particularly those involved in microbiota-driven health and disease using organic synthesis, mass spectrometry, culturing and collaboration'),
       ('Howe Laboratory', 'https://www.howelabvt.com/', 'Matt Howe',
        'Dysregulation of the neurobiological mechanisms that support fundamental functions like motivation and attention may contribute to cognitive and behavioral symptoms of neuropsychiatric and neurodegenerative disorders. Research in the Howe lab takes a systems neuroscience approach to identify the brain-circuits that control these functions, as well as targets within these circuits that can guide the development of new therapeutics.'),
       ('Electron Microprobe Laboratory', 'https://sites.google.com/vt.edu/petrology/facilities/microprobe-lab',
        'Lowell Moore',
        'The Electron Microprobe Lab is a multi-user facility for preparing and analyzing solid materials both in bulk and at the micron scale. The lab includes three electron microprobes, a scanning electron microscope (SEM), a benchtop X-ray Fluorescence Spectrometer (XRF), and a carbon evaporation coater.');

UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Computer Engineering')
WHERE name = 'Complex Networks and Security Research';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Mechanical Engineering')
WHERE name = 'Advanced Materials and Technologies Laboratory';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Aerospace Engineering')
WHERE name = 'Vortical Flow and Diagnostics Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Biological Systems Engineering')
WHERE name = 'A3 Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Biomedical Engineering')
WHERE name = 'Batra Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Chemical Engineering')
WHERE name = 'Nanoscale Characterization and Fabrication Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Civil Engineering')
WHERE name = 'Applied Interdisciplinary Research on Flow Systems (AIRFlowS) Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Industrial and Systems Engineering')
WHERE name = 'Dover Lab for Manufacturing Systems Integration';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Materials Science and Engineering')
WHERE name = 'NanoEarth';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Mining Engineering')
WHERE name = 'Laboratory of Subsurface Energy, Water, and Environmental Systems';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Biology')
WHERE name = 'Aylward Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Chemistry')
WHERE name = 'Gentry Lab';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Nueroscience')
WHERE name = 'Howe Laboratory';
UPDATE lab
SET major_id = (SELECT id FROM major WHERE name = 'Geosciences')
WHERE name = 'Electron Microprobe Laboratory';

-- uncomment when developing

-- INSERT INTO posting (name, description, type, url)
-- VALUES ('Undergraduate Programmer',
--         'The Complex Networks and Security Research backend team is looking for a C++ programmer to work 2-4 hours a week',
--         'Volunteer', 'www.google.com'),
--        ('Graduate Lab Tech', 'We are looking for someone to collect water samples for $15 dollars an hour', 'Paid',
--         'www.google.com'),
--        ('Undergraduate Research Assistant',
--         'Our lab is looking for an assitant to help with experiments for the fall semester for 3 credits. A paper is expected at the end of the semester',
--         'Credit', 'www.google.com');
--
-- UPDATE posting
-- SET lab_id = (SELECT id FROM lab WHERE name = 'Complex Networks and Security Research')
-- WHERE name = 'Undergraduate Programmer';
-- UPDATE posting
-- SET lab_id = (SELECT id FROM lab WHERE name = 'Laboratory of Subsurface Energy, Water, and Environmental Systems')
-- WHERE name = 'Graduate Lab Tech';
-- UPDATE posting
-- SET lab_id = (SELECT id FROM lab WHERE name = 'Vortical Flow and Diagnostics Lab')
-- WHERE name = 'Undergraduate Research Assistant';
--
-- INSERT INTO app_user (username, password, role)
-- VALUES ('user1@gmail.com', 'pass1', 'STUDENT'),
--        ('user2@gmail.com', 'pass2', 'STUDENT'),
--        ('prof1@vt.edu', 'pass1', 'PROFESSOR'),
--        ('admin1@vt.edu', 'pass1', 'ADMIN'),
--        ('prof2@vt.edu', 'pass2', 'PROFESSOR'),
--        ('JohannRuiz176@vt.edu', 'password123', 'STUDENT'),
--        ('BobPollard@vt.edu', 'password123', 'STUDENT'),
--        ('gabriellabiehn2@vt.edu', 'password123', 'STUDENT');

-- INSERT INTO student (first_name, last_name, email, year, major_id, about_me, user_id)
-- VALUES ('Johann', 'Ruiz', 'JohannRuiz176@vt.edu', 'Graduate', 1, 'I work at Collins Aerospace', 7),
--        ('Bob', 'Pollard', 'BobPollard@vt.edu', 'Sophomore', 2, 'Im interested in Robotics', 8),
--        ('Gabby', 'Biehn', 'gabriellabiehn2@vt.edu', 'Senior', 3, 'Im going to be a PA!', 9);

-- UPDATE student
-- SET major_id = (SELECT id FROM major WHERE name = 'Computer Engineering')
-- WHERE first_name = 'Johann';
-- UPDATE student
-- SET major_id = (SELECT id FROM major WHERE name = 'Biology')
-- WHERE first_name = 'Gabby';
-- UPDATE student
-- SET major_id = (SELECT id FROM major WHERE name = 'Geosciences')
-- WHERE first_name = 'Bob';

-- INSERT INTO professor (first_name, last_name, email, college_id, user_id, is_pending)
-- VALUES ('Alice', 'Johnson', 'prof1@vt.edu', 1, 3, 'PENDING'),
--        ('Bob', 'Smith', 'prof2@vt.edu', 2, 4, 'PENDING');
--
-- INSERT INTO professor (first_name, last_name, email, college_id, user_id, pending)
-- VALUES ('Alice', 'Johnson', 'prof1@vt.edu', 1, (SELECT id FROM app_user WHERE username = 'prof1@vt.edu'), true),
--        ('Bob', 'Smith', 'prof2@vt.edu', 2, (SELECT id FROM app_user WHERE username = 'prof2@vt.edu'), false);
--
-- UPDATE professor
-- SET lab_id = (SELECT id FROM lab WHERE name = 'Howe Laboratory')
-- WHERE first_name = 'Matt';

-- INSERT INTO discussion (lab_id, student_id, title, content)
-- VALUES (1, 1, 'Deep Learning Models',
--         'I have been experimenting with different deep learning models for our AI research lab. Does anyone have suggestions on optimizing training time?'),
--        (2, 2, 'Bioinformatics Data Analysis',
--         'I am analyzing large datasets for our bioinformatics lab. What tools and techniques are you using to manage and process such data?'),
--        (1, 3, 'AI Ethics',
--         'As part of our lab discussions, I would like to hear thoughts on the ethical implications of AI. How can we ensure responsible use of AI technologies?');

-- INSERT INTO comment (discussion_id, student_id, content)
-- VALUES (1, 2, 'You can try using distributed computing to speed up the training process.'),
--        (1, 3, 'I recommend using Python libraries like Pandas and NumPy for data manipulation.'),
--        (1, 1, 'Ethics in AI is crucial. We should focus on transparency and accountability in our models.');


-- Inserting sample students
INSERT INTO app_user (username, password, role, pending)
VALUES ('johndoe@vt.edu', 'password123', 'STUDENT', false),
       ('janedoe@vt.edu', 'password123', 'STUDENT', false),
       ('alexsmith@vt.edu', 'password123', 'STUDENT', false);

-- INSERT INTO student (first_name, last_name, email, year, major_id, about_me, user_id)
-- VALUES ('John', 'Doe', 'johndoe@vt.edu', 'Freshman', (SELECT id FROM major WHERE name = 'Computer Engineering'), 'Interested in AI and machine learning', (SELECT id FROM app_user WHERE username = 'johndoe@vt.edu')),
--        ('Jane', 'Doe', 'janedoe@vt.edu', 'Junior', (SELECT id FROM major WHERE name = 'Biology'), 'Passionate about genetics and bioinformatics', (SELECT id FROM app_user WHERE username = 'janedoe@vt.edu')),
--        ('Alex', 'Smith', 'alexsmith@vt.edu', 'Senior', (SELECT id FROM major WHERE name = 'Mechanical Engineering'), 'Focused on robotics and automation', (SELECT id FROM app_user WHERE username = 'alexsmith@vt.edu'));

-- -- Subscribing students to various labs

-- -- John Doe Subscriptions
-- INSERT INTO subscription (student_id, lab_id)
-- VALUES ((SELECT id FROM student WHERE email = 'johndoe@vt.edu'), (SELECT id FROM lab WHERE name = 'Complex Networks and Security Research')),
--        ((SELECT id FROM student WHERE email = 'johndoe@vt.edu'), (SELECT id FROM lab WHERE name = 'Nanoscale Characterization and Fabrication Lab'));

-- -- Jane Doe Subscriptions
-- INSERT INTO subscription (student_id, lab_id)
-- VALUES ((SELECT id FROM student WHERE email = 'janedoe@vt.edu'), (SELECT id FROM lab WHERE name = 'Aylward Lab')),
--        ((SELECT id FROM student WHERE email = 'janedoe@vt.edu'), (SELECT id FROM lab WHERE name = 'Howe Laboratory'));

-- -- Alex Smith Subscriptions
-- INSERT INTO subscription (student_id, lab_id)
-- VALUES ((SELECT id FROM student WHERE email = 'alexsmith@vt.edu'), (SELECT id FROM lab WHERE name = 'Advanced Materials and Technologies Laboratory')),
--        ((SELECT id FROM student WHERE email = 'alexsmith@vt.edu'), (SELECT id FROM lab WHERE name = 'Dover Lab for Manufacturing Systems Integration'));
